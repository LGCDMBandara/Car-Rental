import React from 'react';
import Image from "next/image";

const Hero = () => {
    return (
        <div className="relative w-full h-[480px]">
            <Image
                src="/cars/Hero.jpg"
                alt="Car Background"
                fill
                style={{ objectFit: "cover" }}
            />
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
                <h1 className="text-5xl font-bold text-center">Car Detail</h1>
                <p className="mt-4 text-lg">Find the best cars for <br />your needs</p>
            </div>
        </div>
    );
};

export default Hero;
