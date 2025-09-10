'use client';

import { NavLinks } from '@/constant/constant';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '../../../public/Logo.png';
import { CgMenuRightAlt, CgProfile } from 'react-icons/cg';
import { SlLogin } from 'react-icons/sl';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

type Props = {
    openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
    const [navBg, setNavBg] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setNavBg(window.scrollY >= 90);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`transition-all ${navBg ? 'bg-[#f1f1f1de] shadow-md' : ''
                } duration-200 h-[12vh] z-[10000] fixed w-full`}
        >
            <div className="flex items-center h-full justify-between w-[90%] mx-auto">
                <div className="flex items-center space-x-2">
                    <Image
                        src={Logo}
                        alt="Website Logo"
                        className="w-25 h-12 lg:w-40 lg:h-20 object-contain cursor-pointer p-1"
                    />
                </div>

                <div className="hidden lg:flex items-center space-x-10 relative">
                    {NavLinks.map((link) => {
                        const isActive = pathname === link.url;
                        return (
                            <Link
                                key={link.id}
                                href={link.url}
                                className={`relative px-1 text-base font-medium transition-colors duration-200 ${isActive ? 'text-red-500' : 'text-black hover:text-red-700'
                                    }`}
                            >
                                {link.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute left-0 -bottom-1 h-[2px] w-full bg-red-500"
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="flex items-center space-x-2">
                    {!isLoggedIn ? (
                        <button className="px-3 py-3 sm:px-4 sm:py-3 text-sm cursor-pointer rounded-full border-2 border-red-500 bg-red-500 text-white hover:border-red-700 hover:bg-red-700 transition-all duration-300 flex items-center justify-center sm:space-x-2">
                            <SlLogin className="w-5 h-5" />
                            <span className="hidden sm:inline">Sign In</span>
                        </button>
                    ) : (
                        <CgProfile className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer text-green-600" />
                    )}

                    <CgMenuRightAlt
                        className="w-8 h-8 cursor-pointer text-black lg:hidden"
                        onClick={openNav}
                    />
                </div>

            </div>
        </div>
    );
};

export default Nav;
