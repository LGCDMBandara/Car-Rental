'use client';

import { NavLinks } from '@/constant/constant';
import Link from 'next/link';
import React from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { usePathname } from 'next/navigation';

type Props = {
    showNav: boolean;
    closeNav: () => void;
};

const MobileNav = ({ closeNav, showNav }: Props) => {
    const navOpen = showNav ? 'translate-x-0' : 'translate-x-[100%]';
    const pathname = usePathname();

    return (
        <>
            <div
                className={`fixed inset-0 ${navOpen} transform transition-all right-0 duration-500 z-[100002] bg-black opacity-70 w-full h-screen`}
                onClick={closeNav}
            />
            <div
                className={`text-white fixed ${navOpen} justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-red-700 space-y-6 z-[100050] right-0`}
            >
                {NavLinks.map((link) => {
                    const isActive = pathname === link.url;
                    return (
                        <Link key={link.id} href={link.url} onClick={closeNav}>
                            <p
                                className={`relative w-fit ml-12 pb-1 text-xl sm:text-[30px] transition-colors duration-200 ${isActive ? 'text-white' : 'text-white hover:text-red-200'
                                    }`}
                            >
                                {link.label}
                                <span
                                    className={`absolute left-0 -bottom-1 h-[2px] w-full origin-left transform bg-white transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`}
                                />
                            </p>
                        </Link>
                    );
                })}

                <MdOutlineClose
                    onClick={closeNav}
                    className="absolute top-2.5 right-3 sm:w-8 sm:h-8 w-6 h-6 cursor-pointer"
                />
            </div>
        </>
    );
};

export default MobileNav;
