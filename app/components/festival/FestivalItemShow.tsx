"use client";
import React, { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import ImgAndTitle from "@/app/shared/ImgAndTitle";
import { Skeleton } from "@mui/material";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";



export type FestivalType = {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  description: string;
  location: string;
  image: string;
  is_active: boolean;
  start_date: string;
  end_date: string;
  created_date: string;
};

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

const FestivalItemShow: React.FC = () => {
  const [festivals, setFestivals] = useState<FestivalType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const getFestivalData = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.get("/festival/api/v1/ft/");
      console.log("festivals data:", data);
      setFestivals(data);

      // تبدیل داده‌های فستیوال به ساختار Testimonials
      const testimonialsData = data.map((festival: FestivalType) => ({
        quote: festival.description,
        name: festival.title,
        designation: `${festival.location} | از ${festival.start_date} تا ${festival.end_date}`,
        src: festival.image.startsWith("http")
          ? festival.image
          : `${process.env.NEXT_PUBLIC_API_HOST}${festival.image}`,
      }));
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error("Error fetching festivals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFestivalData();
  }, []);

  return (
    <div className="bg-grayMedium">
      <ImgAndTitle title="فستیوال‌های استان گیلان" imageSrc="/heart.png" />
      {isLoading ? (
        <div className="flex justify-center items-center py-10 rounded-sm">
          <Skeleton variant="rectangular" width={300} height={200} />
        </div>
      ) : (
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      )}
    </div>
  );
};

export default FestivalItemShow;
