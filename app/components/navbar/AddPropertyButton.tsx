'use client';

import React, { useState, useEffect } from 'react';
import useLoginModal from "@/app/hooks/useLoginModal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import { AddPropertyButtonProps } from "../../../types/index";
import { Skeleton } from '@mui/material';

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({ userId }) => {
    const loginModal = useLoginModal();
    const addPropertyModal = useAddPropertyModal();
    const [isLoading, setIsLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false); // برای تغییر متن در زمان hover

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); 
    }, []);

    const airbnbYourHome = () => {
        if (userId) {
            addPropertyModal.open();
        } else {
            loginModal.open();
        }
    };

    return (
        <>
            {isLoading ? (
                <Skeleton variant="rectangular" width={120} height={40} className="rounded-full" />
            ) : (
                <div 
                    onClick={airbnbYourHome}
                    onMouseEnter={() => setIsHovered(true)} 
                    onMouseLeave={() => setIsHovered(false)} 
                    className="w-[90px] text-center p-2 ml-4 text-white cursor-pointer text-sm font-semibold rounded-full bg-airbnbb hover:bg-airbnb-darkk"
                >
                    {isHovered ? "+" : "میزبان شوید"} 
                </div>
            )}
        </>
    );
};

export default AddPropertyButton;
