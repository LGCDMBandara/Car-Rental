"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Hero = () => {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push("/cars");
    };

    return (
        <div className="relative w-full bg-gradient-to-r from-red-50 via-red-100 to-red-50 py-16 px-6 sm:px-10 md:px-16 lg:px-20 flex flex-col lg:flex-row items-center justify-between overflow-hidden pt-28 lg:pt-38">

            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] sm:text-[120px] md:text-[160px] lg:text-[308px] font-extrabold text-white opacity-40 select-none pointer-events-none tracking-tight leading-none whitespace-nowrap">
                RIMBERIO
            </h1>

            <div className="flex flex-col space-y-4 sm:space-y-6 max-w-xl text-center lg:text-left z-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-[-15px]">
                    Your Journey,
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-[-15px]">
                    Your Car,
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                    Your Way
                </h1>

                <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed px-2 sm:px-0">
                    Experience the ultimate freedom of choice with GoCar – tailor your
                    adventure by choosing from our premium fleet of vehicles.
                </p>

                <div className="flex justify-center lg:justify-start gap-4">
                    <button
                        onClick={handleGetStarted}
                        className="cursor-pointer px-6 sm:px-8 md:px-10 py-2 sm:py-3 bg-red-500 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-red-600 transition duration-300 mt-4 sm:mt-5"
                    >
                        Get Started
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex justify-center items-center mt-10 lg:mt-0 relative z-10"
            >
                <div className="relative w-[280px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] drop-shadow-2xl">
                    <Image
                        src="/home/Hero.png"
                        alt="car"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>

            </motion.div>
        </div>
    );
};

export default Hero;
