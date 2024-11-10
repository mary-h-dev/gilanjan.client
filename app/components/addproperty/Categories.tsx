import React from "react";
import Image from "next/image";
import { CategoriesProps } from "../../../types/index";
import { categoriesDataAdd } from '../../constants/data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';



const Categories: React.FC<CategoriesProps> = ({
  dataCategory,
  setCategory,
}) => {
  return (
    <>
      <div className="pt-3 pb-6">
        <Swiper
          slidesPerView={4}
          spaceBetween={0}
          navigation={true}
          modules={[Navigation]}
          className="cursor-pointer"
        >
          {categoriesDataAdd.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                onClick={() => setCategory(item.id)}
                className={`h-[60px] w-full flex flex-col items-center justify-center space-y-2 border-b-2 ${
                    dataCategory === item.id ? "border-black" : "border-white"
                } opacity-60 hover:border-gray-200 hover:opacity-100`}
              >
                <Image
                  src={item.image}
                  alt={`Category - ${item.title}`}
                  width={20}
                  height={20}
                />

                <span className="text-xs">{item.title}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Categories;
