"use client";

import React, { Suspense, useState } from "react";
import Hero from "@/components/Booking/Hero/Hero";
import BookingView from "@/components/Booking/BookingView/BookingView";

const BookingContent = () => {
  const [refreshFlag, setRefreshFlag] = useState(0); 

  return (
    <div>
      <Hero />
      <BookingView key={refreshFlag} />
    </div>
  );
};

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
