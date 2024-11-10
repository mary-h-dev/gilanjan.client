"use client";

import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import PropertyImageList from "./PropertyImageList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Props {
  imageUrls: string[];
}

const ResponsivePropertyImages: React.FC<Props> = ({ imageUrls }) => {
  const isLargeScreen = useMediaQuery("(min-width:700px)");
  const [showSwiper, setShowSwiper] = useState(false);

  const toggleSwiper = () => {
    setShowSwiper(!showSwiper);
  };

  // تنظیم اندازه تصاویر براساس سایز صفحه
  const imageSize = isLargeScreen ? 600 : 300;

  const firstImageUrl = imageUrls[0];

  return (
    <div className="flex flex-col md:flex-row w-full gap-4 mx-auto md:pr-10 my-6">
      <div className="lg:w-1/2 md:full md:h-[450px] relative">
        <Image
          src={firstImageUrl}
          alt="تصویر اول"
          width={800}
          height={600}
          className="object-cover w-full h-full rounded-lg"
        />
        <button
          onClick={toggleSwiper}
          className="absolute bottom-2 left-2 font-light bg-[rgba(0,1,1,0.5)] text-white py-2 px-4 rounded-lg"
        >
          مشاهده تصاویر
        </button>
        {showSwiper && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50 flex items-center justify-center">
            <button
              onClick={toggleSwiper}
              className="absolute top-2 right-2 bg-white text-black py-2 px-4 rounded-lg"
            >
              <svg
                fill="none"
                viewBox="0 0 22 22"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Swiper
              slidesPerView={1}
              spaceBetween={2}
              navigation={true}
              modules={[Navigation, Pagination]}
              className="cursor-pointer"
            >
              {imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className="h-[200px] w-full flex items-center justify-center">
                    <img
                      src={url}
                      alt={`تصویر ${index + 1}`}
                      style={{
                        width: `${imageSize}px`,
                        height: `${imageSize}px`,
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      {/* نمایش PropertyImageList فقط در سایز بزرگ */}
      {isLargeScreen && (
        <div className="lg:w-1/2 md:w-full md:h-1/2">
          <PropertyImageList imageUrls={imageUrls} />
        </div>
      )}
    </div>
  );
};

export default ResponsivePropertyImages;
