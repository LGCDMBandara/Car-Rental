"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";
import { auth } from "../../../utils/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";

interface Booking {
  _id: string;
  name: string;
  address: string;
  telephone: string;
  nic: string;
  pickupDate: string;
  returnDate: string;
  vehicleType: string;
  totalAmount: number;
  carImg: string;
}

const BookingView: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const res = await fetch("http://localhost:5000/api/bookings", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!res.ok) throw new Error("Failed to fetch bookings");

          const data = await res.json();
          setBookings(data);
        } catch (err) {
          console.error("Error fetching bookings:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setBookings([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <ProtectedRoute>
        <p className="text-center text-gray-500 pt-20">Loading bookings...</p>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="pt-16 px-4 sm:px-8 md:px-16 lg:px-20">
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900">
          My Bookings
        </h1>
        <div className="border-b-4 border-red-500 mt-3 lg:mt-5 rounded-full w-32 sm:w-48 lg:w-64 mx-auto mb-10"></div>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            You don’t have any bookings yet.
          </p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-5 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="w-48 h-32 sm:w-64 sm:h-40 overflow-hidden rounded-xl">
                  <Image
                      src={booking.carImg || "/booking/Car.png"}
                      alt={booking.vehicleType || "Vehicle"}
                      fill
                      className="object-cover rounded-xl"
                    />
                </div>

                <div className="sm:w-1/3 text-center sm:text-left">
                  <h2 className="font-bold text-gray-700">
                    Vehicle Type: {booking.vehicleType}
                  </h2>
                  <p className="text-gray-700">Total Amount: ${booking.totalAmount}</p>
                </div>

                <div className="sm:w-1/3 text-center sm:text-left">
                  <p className="text-gray-700">Pickup: {booking.pickupDate}</p>
                  <p className="text-gray-700">Return: {booking.returnDate}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default BookingView;
