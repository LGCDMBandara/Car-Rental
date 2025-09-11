"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RootState, AppDispatch } from "../../../redux/store";
import { fetchCars } from "../../../redux/slices/carsSlice";
import { LoaderPinwheel } from "lucide-react";

interface CarDetailProps {
  carId: string;
}

export default function CarDetail({ carId }: CarDetailProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { cars, loading } = useSelector((state: RootState) => state.cars);

  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const car = cars.find((c) => c.id === Number(carId));

  useEffect(() => {
    setMounted(true);
    if (cars.length === 0) {
      dispatch(fetchCars());
    }
  }, [dispatch, cars.length]);

  useEffect(() => {
    if (car) {
      setSelectedImage(car.img || "/cars/placeholder.jpg");
    }
  }, [car]);

  const handleBooking = () => {
    if (car) {
      router.push(
        `/booking?title=${encodeURIComponent(car.title)}&price=${encodeURIComponent(
          car.price
        )}&img=${encodeURIComponent(car.img || "/cars/placeholder.jpg")}`
      );
    }
  };

  if (!mounted || loading) {
    return (
      <div className="h-80% flex flex-col items-center justify-center bg-white">
        <div className="w-48 h-48 relative">
          <Image
            src="/cars/Loading.gif"
            alt="Loading Cars..."
            fill
            className="object-contain"
          />
        </div>
        <p className="mt-4 text-xl font-semibold text-gray-700">
          Loading Cars...
        </p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-48 h-48 relative">
          <Image
            src="/cars/None.gif"
            alt="Car not found"
            fill
            className="object-contain"
          />
        </div>
        <p className="mt-4 text-xl font-semibold text-gray-700">
          Sorry, Car Not Found
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 pt-6 sm:pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          {selectedImage && (
            <div className="w-full h-64 sm:h-80 lg:h-[400px] relative mb-4">
              <Image
                src={selectedImage}
                alt={car.title}
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {car.images.map((imgUrl, index) => (
              <div key={index} className="w-full h-24 sm:h-32 md:h-40 relative cursor-pointer border-2 rounded-md overflow-hidden" onClick={() => setSelectedImage(imgUrl || "/cars/placeholder.jpg")}>
                <Image
                  src={imgUrl || "/cars/placeholder.jpg"}
                  alt={`${car.title} thumbnail ${index + 1}`}
                  fill
                  className={`object-cover ${selectedImage === imgUrl ? "border-red-500" : "border-transparent"}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-5">
            {car.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-700">Starting at</p>
          <span className="font-bold text-lg sm:text-xl lg:text-2xl">
            ${car.price}/Per Day
          </span>
          <p className="text-gray-600 mt-4 text-sm sm:text-base">
            {car.description}
          </p>

          <div className="flex items-center mt-6">
            <button
              onClick={handleBooking}
              className="bg-red-600 cursor-pointer text-white font-bold py-2 sm:py-3 px-6 sm:px-10 rounded-full hover:bg-red-700 transition duration-300 w-full sm:w-auto"
            >
              Book Now
            </button>
          </div>

          <div className="mt-8 border-t border-red-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">SPECIFICATIONS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
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

      <div className="mt-12 lg:mt-16 border-t border-red-200 pt-8 lg:pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="md:col-span-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 md:mb-8 text-center md:text-left">
              Car Features
            </h2>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {car.features.map((feature, index) => (
                <div key={index} className="bg-gray-100 p-4 sm:p-6 rounded-lg">
                  <h3 className="font-bold text-lg sm:text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
