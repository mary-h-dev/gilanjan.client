"use client";
import React, { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { LayoutGrid } from "@/components/ui/layout-grid";

type PhotoType = {
  id: number;
  image: string;
  title: string | null;
  description: string | null;
};

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

const Gallary: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPhotosData = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.get("/photos/api/v1/photos/");
      console.log("photos data:", response);
      setPhotos(response);

      const transformedCards = transformPhotosToCards(response);
      setCards(transformedCards);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    getPhotosData();
  }, []);


  
  const transformPhotosToCards = (photos: PhotoType[]): Card[] => {
    return photos.map((photo, index) => {
      let className = index % 3 === 0 ? "md:col-span-2" : "col-span-1";
      return {
        id: photo.id,
        content: (
          <div>
            <p className="font-bold md:text-4xl text-xl text-white">
              {photo.title || "بدون عنوان"}
            </p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
              {photo.description || ""}
            </p>
          </div>
        ),
        className: className,
        thumbnail: photo.image,
      };
    });
  };
  




  return (
    <div className="bg-grayMedium">
      {isLoading ? (
        <div>در حال بارگذاری...</div>
      ) : (
        <LayoutGrid cards={cards} />
      )}
    </div>
  );
};

export default Gallary;
