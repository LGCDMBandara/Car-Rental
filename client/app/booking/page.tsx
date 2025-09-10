"use client";

import BookingForm from '@/components/BookingForm/BookingForm'
import React from 'react'
import { useSearchParams } from "next/navigation";

const BookingPage = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const price = searchParams.get("price") || "";

  return (
    <div>
      <BookingForm carTitle={title} carPrice={price} />
    </div>
  )
}

export default BookingPage;
