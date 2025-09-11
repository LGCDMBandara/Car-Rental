"use client";

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchCars } from "../../../redux/slices/carsSlice";
import Image from "next/image";

const View = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { cars, loading } = useSelector((state: RootState) => state.cars);

    useEffect(() => {
        if (cars.length === 0) {
            dispatch(fetchCars());
        }
    }, [dispatch, cars.length]);

    if (loading) return <p className="text-center mt-10">Loading cars...</p>;

    return (
        <div className="pt-10 md:pt-30">
            <h1 className="text-center text-3xl md:text-5xl xl:text-6xl font-semibold text-black">
                Our Impressive Fleet
            </h1>
            <div className="border-b-6 border-red-500 mt-3 lg:mt-5 rounded-full w-40 lg:w-80 mx-auto"></div>

            <div className="block lg:hidden mt-10 px-5">
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={20}
                    slidesPerView={1.2}
                    pagination={{ clickable: true }}
                    breakpoints={{ 640: { slidesPerView: 2 } }}
                    className="rounded-xl"
                >
                    {cars.map((item) => (
                        <SwiperSlide key={item.id} className="rounded-xl">
                            <div className="bg-white rounded-xl shadow-md overflow-hidden text-center p-3">
                                <div className="relative w-full h-56 rounded-xl overflow-hidden">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>

                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                    <p className="text-sm text-center text-gray-500 mt-5">Starting at</p>
                                    <h3 className="text-3xl font-semibold text-gray-800 text-center mt-2">
                                        ${item.price}/Per Day
                                    </h3>
                                    <button
                                        onClick={() => router.push(`/cars/${item.id}`)}
                                        className="px-10 py-3 mx-auto text-sm rounded-full border-2 border-red-500 bg-red-500 text-white hover:border-red-700 hover:bg-red-700 transition-all cursor-pointer duration-300 mt-5"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-5 xl:px-50">
                {cars.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer text-center p-5 hover:bg-gray-200"
                    >
                        <div className="relative w-full h-56 rounded-xl overflow-hidden">
                            <Image
                                src={item.img}
                                alt={item.title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        <h3 className="text-2xl font-semibold text-gray-800 text-left mt-5">{item.title}</h3>
                        <p className="text-lg text-left text-gray-500 mt-10">Starting at</p>
                        <div className="flex justify-between">
                            <h3 className="text-2xl font-semibold text-gray-800 text-left">${item.price}/Per Day</h3>
                            <button
                                onClick={() => router.push(`/cars/${item.id}`)}
                                className="px-5 py-3 text-sm rounded-full border-2 border-red-500 bg-red-500 text-white hover:border-red-700 hover:bg-red-700 transition-all duration-300 cursor-pointer"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default View;
