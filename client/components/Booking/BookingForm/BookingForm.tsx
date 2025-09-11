"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";
import toast from "react-hot-toast";
import { auth } from "../../../utils/firebaseClient";
import { useSearchParams, useRouter } from "next/navigation";

interface BookingFormProps {
    carTitle: string;
    carPrice: string;
    carImg: string | null;
    onBookingAdded: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onBookingAdded }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const carTitle = searchParams.get("title") || "";
    const carPrice = searchParams.get("price") || "0";
    const carImg = searchParams.get("img") || "/cars/placeholder.jpg";
    const pricePerDay = Number(carPrice);

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        telephone: "",
        nic: "",
        pickupDate: "",
        returnDate: "",
        vehicleType: carTitle,
        totalAmount: 0,
        carImg: carImg,
    });

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            vehicleType: carTitle,
            carImg: carImg,
        }));
    }, [carTitle, carImg]);

    useEffect(() => {
        if (formData.pickupDate && formData.returnDate) {
            const start = new Date(formData.pickupDate);
            const end = new Date(formData.returnDate);
            if (end >= start) {
                const days =
                    Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                setFormData((prev) => ({ ...prev, totalAmount: days * pricePerDay }));
            } else {
                setFormData((prev) => ({ ...prev, totalAmount: 0 }));
            }
        } else {
            setFormData((prev) => ({ ...prev, totalAmount: 0 }));
        }
    }, [formData.pickupDate, formData.returnDate, pricePerDay]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.totalAmount <= 0) return toast.error("Invalid booking dates!");
        if (!formData.name || !formData.telephone) return toast.error("Please fill required fields!");

        try {
            const user = auth.currentUser;
            if (!user) return toast.error("You must be logged in!");
            const token = await user.getIdToken();

            const res = await fetch(
                "https://car-rental-backend-production-ceab.up.railway.app/api/bookings",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!res.ok) throw new Error("Failed to save booking");

            toast.success(`Booking confirmed for ${formData.name}! 🚗`);

            setFormData({
                name: "",
                address: "",
                telephone: "",
                nic: "",
                pickupDate: "",
                returnDate: "",
                vehicleType: carTitle,
                totalAmount: 0,
                carImg: carImg,
            });

            onBookingAdded?.();
            router.push("/booking");
        } catch (err) {
            toast.error("Error saving booking!");
            console.error(err);
        }
    };

    return (
        <ProtectedRoute>
            <form onSubmit={handleSubmit} className="px-5 pt-10 md:pt-30 md:px-20">
                <h1 className="text-center text-3xl md:text-5xl xl:text-6xl font-semibold text-black">
                    Book Your Ride
                </h1>
                <div className="border-b-6 border-red-500 mt-3 lg:mt-5 rounded-full w-40 lg:w-80 mx-auto mb-10"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">NIC Number</label>
                        <input
                            type="text"
                            name="nic"
                            value={formData.nic}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telephone Number</label>
                        <input
                            type="tel"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                        <input
                            type="date"
                            name="pickupDate"
                            value={formData.pickupDate}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                        <input
                            type="date"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                        <input
                            type="text"
                            name="vehicleType"
                            value={formData.vehicleType}
                            readOnly
                            className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                        <input
                            type="text"
                            name="totalAmount"
                            value={`$${formData.totalAmount}`}
                            readOnly
                            className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-start">
                    <button
                        type="submit"
                        className="bg-red-500 cursor-pointer text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
                    >
                        Confirm Booking
                    </button>
                </div>
            </form>
        </ProtectedRoute>
    );
};

export default BookingForm;
