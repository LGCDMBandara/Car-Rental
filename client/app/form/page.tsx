"use client";

import Hero from '@/components/Booking/Hero/Hero'
import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import BookingForm from "@/components/Booking/BookingForm/BookingForm";

const UserForm = () => {
    const searchParams = useSearchParams();
    const title = searchParams.get("title") || "";
    const price = searchParams.get("price") || "";
    const img = searchParams.get("img")?.trim() || null;
    const [refreshFlag, setRefreshFlag] = useState(0);

    const handleBookingAdded = () => {
        setRefreshFlag(prev => prev + 1);
    }

    return (
        <div>
            <Hero />
            <BookingForm
                carTitle={title}
                carPrice={price}
                carImg={img}
                onBookingAdded={handleBookingAdded}
            />
        </div>
    )
}

export default function FormPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <UserForm />
    </Suspense>
  );
}
