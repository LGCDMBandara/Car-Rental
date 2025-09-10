"use client";

import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";

const firebaseConfig = {
  apiKey: "AIzaSyBm6q2Vv2nErzd3UOl4Z-nhw-VL8i8uQUE",
  authDomain: "carrentalapp-3327f.firebaseapp.com",
  projectId: "carrentalapp-3327f",
  storageBucket: "carrentalapp-3327f.firebasestorage.app",
  messagingSenderId: "22558576260",
  appId: "1:22558576260:web:023cfcc554550925a27cd1",
  measurementId: "G-FMFY3K6XFP",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginRegister = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify({ email: user.email, uid: user.uid }));
      dispatch(login());
      toast.success("Login Successful!");
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError("An unknown error occurred");
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify({ email: user.email, uid: user.uid }));
      dispatch(login());
      toast.success("Account Created Successfully!");
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        if ((err as any).code === "auth/email-already-in-use") {
          setError("This email is already registered. Please login.");
          toast.error("This email is already registered. Please login.");
        } else {
          setError(err.message);
          toast.error(err.message);
        }
      } else {
        setError("An unknown error occurred");
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <div className="absolute w-full h-full backdrop-blur-lg"></div>

      <div className="relative bg-gray-200 p-10 rounded-xl shadow-lg w-96 z-10">
        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-3 border border-gray-300 rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-3 border border-gray-300 rounded" required />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)} className="text-blue-500 cursor-pointer hover:underline">
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
