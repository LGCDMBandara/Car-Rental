"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

type Props = {
    quickLinks?: { label: string; href: string }[];
};

export default function Footer({
    quickLinks = [
        { label: "Home", href: "/" },
        { label: "Car Details", href: "/cars" },
        { label: "Booking", href: "/booking" },
    ],
}: Props) {
    return (
        <footer className="mt-10 md:mt-30 border-t border-slate-200 bg-slate-50 py-8">
            <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:gap-0 sm:px-6 lg:px-8">
                <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
                    {quickLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="transition hover:text-red-500"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <SocialIcon
                        href="https://www.facebook.com"
                        Icon={Facebook}
                        label="Facebook"
                    />
                    <SocialIcon
                        href="https://www.instagram.com"
                        Icon={Instagram}
                        label="Instagram"
                    />
                    <SocialIcon
                        href="https://twitter.com"
                        Icon={Twitter}
                        label="Twitter"
                    />
                    <SocialIcon
                        href="https://linkedin.com"
                        Icon={Linkedin}
                        label="LinkedIn"
                    />
                </div>

            </div>

            <div className="mt-6 text-center text-xs text-slate-500">
                © {new Date().getFullYear()} RIMBERIO Car Rental. All rights reserved.
            </div>
        </footer>
    );
}

function SocialIcon({
    href,
    Icon,
    label,
}: {
    href: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
}) {
    return (
        <Link
            href={href}
            aria-label={label}
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-red-500"
        >
            <Icon className="h-4 w-4" />
        </Link>
    );
}