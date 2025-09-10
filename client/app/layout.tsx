import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['100','200','300','400', '500', '600', '700'], 
  subsets: ['latin'],
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "Car Rental",
  description: "Rent cars easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body className={`${poppins.className} bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
