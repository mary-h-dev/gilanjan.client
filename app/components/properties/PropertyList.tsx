"use client";
import React from "react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";
import useSearchModal from "@/app/hooks/useSearchModal";
import { PropertyType, PropertyListProps } from "../../../types/index";
import { Skeleton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const PropertyList: React.FC<PropertyListProps> = ({
  landlord_id,
  favorites,
}) => {
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const country = searchModal.query.country;
  const numGuests = searchModal.query.guests;
  const numBathrooms = searchModal.query.bathrooms;
  const numBedrooms = searchModal.query.bedrooms;
  const checkinDate = searchModal.query.checkIn;
  const checkoutDate = searchModal.query.checkOut;
  const category = searchModal.query.category;
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [itemsToShow, setItemsToShow] = useState(8);

  const showMoreItems = () => {
    setItemsToShow((prev) => prev + 4);
  };

  console.log("searchQuery:", searchModal.query);
  console.log("numBedrooms", numBedrooms);

  const markFavorite = (id: string, is_favorite: boolean) => {
    const tmpProperties = properties.map((property: PropertyType) => {
      if (property.id == id) {
        property.is_favorite = is_favorite;

        if (is_favorite) {
          console.log("added to list of favorited properties");
        } else {
          console.log("removed from list");
        }
      }

      return property;
    });

    setProperties(tmpProperties);
  };

  const getProperties = async () => {
    setIsLoading(true);
    let url = "/properties/api/v1/";

    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`;
    } else if (favorites) {
      url += "?is_favorites=true";
    } else {
      let urlQuery = "";

      if (country) {
        urlQuery += "&country=" + country;
      }

      if (numGuests) {
        urlQuery += "&numGuests=" + numGuests;
      }

      if (numBedrooms) {
        urlQuery += "&numBedrooms=" + numBedrooms;
      }

      if (numBathrooms) {
        urlQuery += "&numBathrooms=" + numBathrooms;
      }

      if (category) {
        urlQuery += "&category=" + category;
      }

      if (checkinDate) {
        urlQuery += "&checkin=" + format(checkinDate, "yyyy-MM-dd");
      }

      if (checkoutDate) {
        urlQuery += "&checkout=" + format(checkoutDate, "yyyy-MM-dd");
      }

      if (urlQuery.length) {
        console.log("Query:", urlQuery);

        urlQuery = "?" + urlQuery.substring(1);

        url += urlQuery;
      }
    }

    const tmpProperties = await apiService.get(url);

    setProperties(
      tmpProperties.data.map((property: PropertyType) => {
        if (tmpProperties.favorites.includes(property.id)) {
          property.is_favorite = true;
        } else {
          property.is_favorite = false;
        }

        return property;
      })
    );
    setIsLoading(false);
  };

  useEffect(() => {
    getProperties();
  }, [category, searchModal.query, params]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {isLoading ? (
        // حالت بارگذاری (Loading)
        <div className="w-full mb-2 mt-2 grid grid-cols-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4 z-2 px-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="mb-4">
              <div className="relative overflow-hidden aspect-square rounded-xl h-[300px]">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                />
              </div>
              <div className="mt-2">
                <Skeleton
                  variant="text"
                  width="60%"
                  height={30}
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                />
              </div>
              <div className="mt-2">
                <Skeleton
                  variant="text"
                  width="40%"
                  height={20}
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : properties.length === 0 ? (
        // نمایش پیغام در صورت نبود آگهی
        <div className="w-full h-screen flex justify-center my-6">
          <p className="w-fit h-fit text-gray-600 text-center bg-red-200 p-4 border-2 border-airbnbb rounded-3xl">
            آگهی‌ای توسط شما ثبت نشده است.
          </p>
        </div>
      ) : (
        // نمایش لیست آگهی‌ها
        <>
          <div className="w-full mb-2 mt-2 grid grid-cols-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4 z-2 px-6">
            <AnimatePresence>
              {properties.slice(0, itemsToShow).map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.9 }}
                >
                  <PropertyListItem
                    property={property}
                    markFavorite={(is_favorite: any) =>
                    markFavorite(property.id, is_favorite)
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {itemsToShow < properties.length && (
            <div className="relative w-full flex items-center justify-center z-30 mt-[-300px]">
              <img
                src="/more-fadeout.png"
                alt="icon"
                className="w-[100%] h-[350px]"
              />
              <motion.button
                onClick={showMoreItems}
                className="absolute top-[30%] left-[42%] px-8 py-2 bg-white font-light text-xl text-gray-600 rounded-2xl hover:bg-gray-200"
                layout
              >
                بیشتر نمایش بده
              </motion.button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyList;
