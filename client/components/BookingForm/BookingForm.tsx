"use client";

import React, { useState } from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

interface BookingFormProps {
  carId: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ carId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pickupDate: "",
    returnDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const booking = {
      carId,
      ...formData,
    };

    // For now, log it. Later you can dispatch to Redux or send API request
    console.log("Booking submitted:", booking);

    alert(`Booking confirmed for ${formData.name}! 🚗`);

    // Reset form
    setFormData({
      name: "",
      email: "",
      pickupDate: "",
      returnDate: "",
    });
  };

  return (
    <ProtectedRoute>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 mt-6 max-w-lg mx-auto space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Book This Car
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Confirm Booking
        </button>
      </form>
    </ProtectedRoute>
  );
};

export default BookingForm;
