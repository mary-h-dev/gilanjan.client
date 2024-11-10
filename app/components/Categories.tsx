'use client';
import React from "react";
import { useState , useEffect } from 'react';
import Image from 'next/image';
import useSearchModal from '../hooks/useSearchModal';
import { SearchQuery } from '@/types';
import { categoriesData } from '../constants/data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Skeleton } from '@mui/material'

import 'swiper/css';
import 'swiper/css/navigation';

const Categories = () => {
  const searchModal = useSearchModal();
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // شبیه‌سازی بارگذاری داده‌ها
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // دو ثانیه تأخیر برای بارگذاری
  }, []);

    


  const _setCategory = (_category: string) => {
    setCategory(_category);

    const query: SearchQuery = {
      country: searchModal.query.country,
      checkIn: searchModal.query.checkIn,
      checkOut: searchModal.query.checkOut,
      guests: searchModal.query.guests,
      bedrooms: searchModal.query.bedrooms,
      bathrooms: searchModal.query.bathrooms,
      category: _category,
    };

    searchModal.setQuery(query);
  };

  return (
    <div className="pt-3 pb-6 px-6">
      <Swiper
        slidesPerView={10}
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        className="cursor-pointer"
        breakpoints={{
          300: {
            slidesPerView: 4,
            spaceBetween: 3,
          },
          640: {
            slidesPerView: 8,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 10,
            spaceBetween: 5,
          },
        }}
      >
        {categoriesData.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              onClick={() => _setCategory(item.id)}
              className={`h-[60px] w-full flex flex-col items-center justify-center space-y-2 border-b-2 ${
                category === item.id ? 'border-airbnbb' : 'border-white'
              } opacity-60 hover:border-gray-200 hover:opacity-100`}
            >
              {isLoading ? (
                <>
                  <Skeleton variant="circular" width={20} height={20}  style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
                  <Skeleton variant="text" width={40} height={15}  style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
                </>
              ) : (
                <>
                  <Image
                    src={item.image}
                    alt={`Category - ${item.title}`}
                    width={20}
                    height={20}
                  />
                  <span className="text-xs">{item.title}</span>
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Categories;
