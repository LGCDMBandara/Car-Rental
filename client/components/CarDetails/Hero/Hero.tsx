import React from 'react';

const Hero = () => {
    return (
        <div className="relative w-full h-120">
            <img
                src="/cars/Hero.jpg"
                alt="Car Background"
                className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
                <h1 className="text-5xl font-bold">Car Detail</h1>
                <p className="mt-4 text-lg">Find the best cars for <br />your needs</p>
            </div>
        </div>
    );
};

export default Hero;
