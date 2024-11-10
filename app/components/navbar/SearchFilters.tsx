"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { Skeleton, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";

const SearchFilters = () => {
  const searchModal = useSearchModal();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // شبیه‌سازی زمان بارگذاری داده‌ها
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // بارگذاری به مدت ۲ ثانیه
  }, []);

  return (
    <div
      onClick={() => searchModal.open("location")}
      className="h-[48px] lg:h-[64px] flex flex-row-reverse items-center justify-between border rounded-full"
    >
      {isLoading ? (
        <>
          {/* Skeleton فقط برای علامت سرچ در سایز کوچک */}
          <div className="lg:hidden">
            <Skeleton
              variant="rectangular"
              width={48}
              height={48}
              className="mx-2 rounded-full"
            />
          </div>

          <Skeleton
            variant="rectangular"
            width={100}
            height={48}
            className="hidden lg:block mx-2 rounded-full"
          />

          <Skeleton
            variant="rectangular"
            width={100}
            height={48}
            className="hidden lg:block mx-2 rounded-full"
          />

          <Skeleton
            variant="rectangular"
            width={100}
            height={48}
            className="hidden lg:block mx-2 rounded-full"
          />

          <Skeleton
            variant="rectangular"
            width={250}
            height={48}
            className="hidden lg:block mx-2 rounded-full"
          />
        </>
      ) : (
        <>
          <div className="hidden lg:block">
            <div className="flex flex-row-reverse items-center justify-between">
              <div className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                <p className="text-xs font-semibold text-gray-400">مهمانان</p>
                <p className="text-sm text-gray-300">تعداد مهمانان</p>
              </div>
              <Divider
                orientation="vertical"
                flexItem
                className="divider-lg"
                style={{ height: "30px", alignSelf: "center" }}
              />
              <div className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                <p className="text-xs font-semibold text-gray-400">خروج</p>
                <p className="text-sm text-gray-300">انتخاب تاریخ</p>
              </div>
              <Divider
                orientation="vertical"
                flexItem
                className="divider-lg"
                style={{ height: "30px", alignSelf: "center" }}
              />
              <div className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                <p className="text-xs font-semibold text-gray-400">ورود</p>
                <p className="text-sm text-gray-300">انتخاب تاریخ</p>
              </div>
            </div>
          </div>

          <Divider
            orientation="vertical"
            flexItem
            className="divider-lg"
            style={{ height: "30px", alignSelf: "center" }}
          />
          <div className="px-2 cursor-pointer flex flex-row-reverse items-center justify-center rounded-full hover:bg-gray-100">
            <div className="hidden lg:flex w-[250px] lg:h-[64px] px-8 flex-col justify-center">
              <p className="text-xs font-semibold text-gray-400">کجا</p>
              <p className="text-sm text-gray-300">جستجوی مکان مورد نظر</p>
            </div>
            <div className="cursor-pointer p-2 lg:p-4 bg-airbnbb hover:bg-airbnb-darkk transition rounded-full text-white">
              <svg
                viewBox="0 0 32 32"
                style={{
                  display: "block",
                  fill: "none",
                  height: "16px",
                  width: "16px",
                  stroke: "currentColor",
                  strokeWidth: 4,
                  overflow: "visible",
                }}
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path
                  fill="none"
                  d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                ></path>
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchFilters;
