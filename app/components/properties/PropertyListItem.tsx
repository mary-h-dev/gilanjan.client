import Image from "next/image";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";
import { PropertyProps } from "../../../types/index";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const customLoader = ({ src }: { src: string }) => {
  return src;
};

const PropertyListItem: React.FC<PropertyProps> = ({
  property,
  markFavorite,
}) => {
  const router = useRouter();


  return (
    <div className="cursor-pointer z-2"
    >
      <div className="w-full relative overflow-hidden aspect-square rounded-xl h-[300px]">
        <Swiper
          navigation={true}
          modules={[Navigation, Pagination]}
          className="relative w-full h-full"
          pagination={{ clickable: true }}
        >
          {property.image_urls.map((url, index) => (
            <SwiperSlide key={index} className="relative w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  loader={customLoader}
                  src={url}
                  fill
                  sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
                  className="hover:scale-110 object-cover transition h-full w-full"
                  alt={`تصویر ${index + 1}`}
                />
                <div
                  className="absolute inset-0"
                  onClick={() => router.push(`/properties/${property.id}`)}
                />
              </div>
            </SwiperSlide>
          ))}
          {markFavorite && (
            <div className="absolute top-2 right-2 z-20">
              <FavoriteButton
                id={property.id}
                is_favorite={property.is_favorite}
                markFavorite={(is_favorite) => markFavorite(is_favorite)}
              />
            </div>
          )} 
        </Swiper>
      </div>

      <div className="mt-2 cursor-pointer">
        <p
          className="text-lg font-bold"
          onClick={() => router.push(`/properties/${property.id}`)}
        >
          {property.title}
        </p>
      </div>

      <div className="mt-2">
        <p className="text-sm text-gray-500">
          <strong>${property.price_per_night}</strong> هر شب
        </p>
      </div>
    </div>
  );
};

export default PropertyListItem;




