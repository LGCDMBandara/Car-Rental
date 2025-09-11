"use client";

import React, { useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { Mail, Lock, Eye, EyeOff, LoaderCircle } from "lucide-react";

const firebaseConfig = {
  apiKey: "AIzaSyBm6q2Vv2nErzd3UOl4Z-nhw-VL8i8uQUE",
  authDomain: "carrentalapp-3327f.firebaseapp.com",
  projectId: "carrentalapp-3327f",
  storageBucket: "carrentalapp-3327f.firebasestorage.app",
  messagingSenderId: "22558576260",
  appId: "1:22558576260:web:023cfcc554550925a27cd1",
  measurementId: "G-FMFY3K6XFP",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

const LoginRegister: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleAuthAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const action = isLogin
      ? signInWithEmailAndPassword(auth, email, password)
      : createUserWithEmailAndPassword(auth, email, password);

    try {
      const userCredential = await action;
      const user = userCredential.user;

      localStorage.setItem("user", JSON.stringify({ email: user.email, uid: user.uid }));
      dispatch(login());
      toast.success(isLogin ? "Login Successful!" : "Account Created Successfully!");
      router.push("/");
    } catch (err: unknown) {
      let errorMessage = "An unknown error occurred.";

      // Narrow unknown to Error safely
      if (err instanceof Error) {
        errorMessage = err.message;

        // Optional: parse Firebase error codes from message
        if (errorMessage.includes("auth/user-not-found") || errorMessage.includes("auth/wrong-password")) {
          errorMessage = "Invalid email or password. Please try again.";
        } else if (errorMessage.includes("auth/email-already-in-use")) {
          errorMessage = "This email is already registered. Please login.";
        } else if (errorMessage.includes("auth/weak-password")) {
          errorMessage = "Password should be at least 6 characters.";
        }
      }

      toast.error(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 md:px-8"
      style={{ backgroundImage: "url('/login/Background.jpg')" }}
    >
      <div className="absolute w-full h-full bg-black/50 backdrop-blur-sm"></div>

      <div className="relative bg-black/30 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg z-10 border border-white/20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-6">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        <form onSubmit={handleAuthAction} className="flex flex-col gap-4 sm:gap-5">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-10 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 pr-10 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 cursor-pointer text-white py-3 sm:py-3.5 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-300 text-sm sm:text-base">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-500 font-semibold cursor-pointer hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
