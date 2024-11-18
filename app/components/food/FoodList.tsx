"use client";
import React from "react";
import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { FoodCard } from "./FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import "swiper/css";
import ImgAndTitle from "@/app/shared/ImgAndTitle";
import { Skeleton } from "@mui/material"; 



export type SectionFoodType = {
  id: number;
  title: string;
  image: string;
  description: string;
  order: number;
};

export type FoodType = {
  id: string;
  name: string;
  slug: string;
  category: string;
  author: string;
  ingredients: string;
  recipe: string;
  image: string;
  is_active: boolean;
  tags: string[];
  created_date: string;
  updated_date: string;
  sections: SectionFoodType[];
};

// تعریف آرایه‌ای از رنگ‌ها
const backgroundColors = [
  "bg-primary-one",
  "bg-primary-two",
  "bg-secondary-one",
  "bg-secondary-three",
  "bg-purple-300",
  "bg-airbnbb",
  "bg-indigo-400",
  "bg-Neutral-400",
];

const FoodList: React.FC = () => {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getFoods = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.get("/food/api/v1/fd/list");
      console.log("Foods data:", data);
      setFoods(data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div className="bg-grayMedium">
      <ImgAndTitle title="غذاهای محلی گیلان" imageSrc="/heart.png" />
      <BackgroundBeamsWithCollision>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          grabCursor={true}
          className="cursor-pointer"
          breakpoints={{
            350: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 7,
            },
            820: {
              slidesPerView: 4,
              spaceBetween: 8,
            },
            1000: {
              slidesPerView: 6,
              spaceBetween: 8,
            },
          }}
        >
          {isLoading
            ? 
              Array.from({ length: 6 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-32 h-32">
                      <Skeleton
                        variant="circular"
                        width="100%"
                        height="100%"
                        animation="wave"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : 
              foods.map((food, index) => (
                <SwiperSlide key={food.id}>
                  <div className="w-full h-full flex items-center justify-center">
                    <FoodCard
                      food={food}
                      bgColor={
                        backgroundColors[index % backgroundColors.length]
                      }
                    />
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </BackgroundBeamsWithCollision>
    </div>
  );
};

export default FoodList;
