'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { UserNavProps } from "../../../types/index";
import MenuLink from "./MenuLink";
import LogoutButton from "../LogoutButton";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSignupModal from "@/app/hooks/useSignupModal";
import { Skeleton } from '@mui/material';
 
const UserNav: React.FC<UserNavProps> = ({ userId }) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const signupModal = useSignupModal();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // شبیه‌سازی زمان بارگذاری داده‌ها
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // بارگذاری به مدت ۲ ثانیه
    }, []);

    return (
        <div className="p-2 relative inline-block border rounded-full">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center"
            >
                {isLoading ? (
                    <>
                        {/* نمایش Skeleton به جای آیکون‌ها در حین بارگذاری */}
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton variant="circular" width={24} height={24} className="ml-2" />
                    </>
                ) : (
                    <>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </>
                )}
            </button>

            {isOpen && (
                <div className="w-[200px] absolute top-[60px] left-0 bg-white border rounded-xl shadow-md flex flex-col cursor-pointer">
                    {isLoading ? (
                        <>
                            {/* نمایش Skeleton در منوی باز هنگام بارگذاری */}
                            <Skeleton variant="text" width="80%" height={30} className="my-2 mx-auto" />
                            <Skeleton variant="text" width="80%" height={30} className="my-2 mx-auto" />
                            <Skeleton variant="text" width="80%" height={30} className="my-2 mx-auto" />
                            <Skeleton variant="text" width="80%" height={30} className="my-2 mx-auto" />
                        </>
                    ) : (
                        userId ? (
                            <>
                                <MenuLink
                                    label='چت شخصی'
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push('/inbox');
                                    }}
                                />

                                <MenuLink
                                    label=' آگهی های ثبت شده من'
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push('/myproperties');
                                    }}
                                />

                                <MenuLink
                                    label='علاقه مندی های من'
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push('/myfavorites');
                                    }}
                                />

                                <MenuLink
                                    label='رزروهای من'
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push('/myreservations');
                                    }}
                                />

                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <MenuLink 
                                    label='ورود'
                                    onClick={() => {
                                        setIsOpen(false);
                                        loginModal.open();
                                    }}
                                />

                                <MenuLink 
                                    label='ثبت نام'
                                    onClick={() => {
                                        setIsOpen(false);
                                        signupModal.open();
                                    }}
                                />
                            </>
                        )
                    )}
                </div>
            )}
        </div>
    )
}

export default UserNav;
