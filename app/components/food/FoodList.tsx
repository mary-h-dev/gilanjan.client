"use client";
import React from "react";
import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import WithLine from "@/app/shared/WithLine";
import { FoodCard } from "./FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import "swiper/css";

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
    <WithLine title="مجلات گیلان جان" />
    <BackgroundBeamsWithCollision>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <h1>در حال بارگذاری...</h1>
          </div>
        ) : (
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
                slidesPerView: 5,
                spaceBetween: 8,
              },
            }}
          >
            {foods.map((food, index) => (
              <SwiperSlide key={food.id}>
                <div className="w-full h-full flex items-center justify-center">
                  <FoodCard
                    food={food}
                    bgColor={backgroundColors[index % backgroundColors.length]}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
    </BackgroundBeamsWithCollision>
    </div>
  );
};

export default FoodList;
