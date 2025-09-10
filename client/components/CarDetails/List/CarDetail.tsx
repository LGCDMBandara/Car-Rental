"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "../../../redux/store";
import { fetchCars } from "../../../redux/slices/carsSlice";
import { LoaderPinwheel } from "lucide-react";

interface CarDetailsProps {
    carId: string;
}

export default function CarDetails({ carId }: CarDetailsProps) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { cars, loading } = useSelector((state: RootState) => state.cars);

    const car = cars.find((c) => c.id === Number(carId));
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        if (cars.length === 0) {
            dispatch(fetchCars());
        }
    }, [dispatch, cars.length]);

    useEffect(() => {
        if (car) {
            setSelectedImage(car.img);
        }
    }, [car]);


    if (loading) {
        return (
            <div className="h-80% flex flex-col items-center justify-center bg-white">
                <img
                    className="w-48 h-48"
                    src="/cars/Loading.gif"
                    alt="Loading Cars..."
                />
                <p className="mt-4 text-xl font-semibold text-gray-700">Loading Cars...</p>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <img
                    className="w-48 h-48"
                    src="/cars/None.gif"
                    alt="Car not found"
                />
                <p className="mt-4 text-xl font-semibold text-gray-700">Sorry, Car Not Found</p>
            </div>
        );
    }

    const handleBooking = () => {
        router.push(`/booking?title=${encodeURIComponent(car.title)}&price=${encodeURIComponent(car.price)}`);
    };

    return (
        <div className="container mx-auto px-20 pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <img
                        src={selectedImage}
                        alt={car.title}
                        className="w-full h-100 object-cover rounded-lg shadow-lg mb-4"
                    />
                    <div className="grid grid-cols-3 gap-4">
                        {car.images.map((imgUrl, index) => (
                            <img
                                key={index}
                                src={imgUrl}
                                alt={`${car.title} thumbnail ${index + 1}`}
                                className={`w-full h-40 object-cover rounded-md cursor-pointer border-2 ${selectedImage === imgUrl ? 'border-red-500' : 'border-transparent'}`}
                                onClick={() => setSelectedImage(imgUrl)}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="text-5xl font-bold mb-5">{car.title}</h1>
                    <p className="text-xl text-gray-700">
                        Starting at
                    </p>
                    <span className="font-bold text-2xl">${car.price}/Per Day</span>
                    <p className="text-gray-600 mt-4">{car.description}</p>

                    <div className="flex items-center mt-6">
                        <button
                            onClick={handleBooking}
                            className="bg-red-600 cursor-pointer text-white font-bold py-3 px-15 rounded-full hover:bg-red-700 transition duration-300"
                        >
                            Book Now
                        </button>
                    </div>

                    <div className="mt-8 border-t border-red-200 pt-6">
                        <h3 className="text-lg font-semibold mb-4">SPECIFICATIONS</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {car.specifications.map((spec, index) => (
                                <div key={index} className="flex items-center text-gray-700">
                                    <LoaderPinwheel className="text-red-500 mr-2" />
                                    <span>{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 border-t border-red-200 pt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <h2 className="text-5xl font-semibold mb-4 md:mb-8 md:text-left text-center">Car Features</h2>
                    </div>
                    <div className="md:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {car.features.map((feature, index) => (
                                <div key={index} className="bg-gray-100 p-6 rounded-lg">
                                    <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}