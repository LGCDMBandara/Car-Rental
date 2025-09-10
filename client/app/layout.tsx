import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "@/components/Helpers/Navbar/ResponsiveNav";
import Footer from "@/components/Helpers/Footer/Footer";
import ReduxProvider from "@/redux/provider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
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
        <ReduxProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <ResponsiveNav />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
