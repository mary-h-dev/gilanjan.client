"use client";
import React from "react";
import Modal from "./Modal";
import { useState } from "react";
import CustomButton from "../forms/CustomButton";
import useSearchModal from "@/app/hooks/useSearchModal";
import { SearchQuery } from "../../../types/index";
import { SelectProvinceValue } from "../../../types/index";
import SelectProvince from "../forms/SelectProvince";
import {convertToPersianDigits } from "../../utils/fonts"
import MainDatePicker from "../forms/MainDatePicker"
import { CalendarIcon } from "lucide-react"






const SearchModal = () => {
  let content = <></>;
  const searchModal = useSearchModal();
  const [numGuests, setNumGuests] = useState<string>("1");
  const [numBedrooms, setNumBedrooms] = useState<string>("0");
  const [country, setCountry] = useState<SelectProvinceValue>();
  const [numBathrooms, setNumBathrooms] = useState<string>("0");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  



  const closeAndSearch = () => {
    const newSearchQuery: SearchQuery = {
      country: country?.label,
      checkIn: startDate,
      checkOut: endDate,
      guests: parseInt(numGuests),
      bedrooms: parseInt(numBedrooms),
      bathrooms: parseInt(numBathrooms),
      category: "",
    };
  
    searchModal.setQuery(newSearchQuery);
    searchModal.close();
  };
  




  
  const _setDateRange = (value: Date | null, isCheckin: boolean) => {
    if (isCheckin) {
      setStartDate(value);
      searchModal.open("checkout");
    } else {
      setEndDate(value);
      searchModal.open("details");
    }
  };
  





  const contentLocation = (
    <>
      <h2 className="mb-6 text-2xl">کجا می‌خوای بری؟</h2>

      <SelectProvince
        value={country}
        onChange={(value) => setCountry(value as SelectProvinceValue)}
      />

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="تاریخ  ->"
          onClick={() => searchModal.open("dateRange")}
        />
      </div>
    </>
  );


  const contentDateRange = (
    <>
      <h2 className="text-xl mb-4 text-center">تاریخ ورود و خروج</h2>

      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-1">تاریخ ورود:</span>
          <div className="flex flex-row items-center justify-center p-2 border border-gray-300 rounded-sm">
        <MainDatePicker
            value={startDate}
            onChange={(value) => setStartDate(value)}
          />
            <CalendarIcon className="text-gray-300"/>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-1">تاریخ خروج:</span>
          <div className="flex flex-row items-center justify-center p-2 border border-gray-300 rounded-sm">
          <MainDatePicker
            value={endDate}
            onChange={(value) => setEndDate(value)}
          />
          <CalendarIcon  className="text-gray-300"/>
          </div>
        </div>
      </div>
  
      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- مکان"
          onClick={() => searchModal.open("location")}
        />
        <CustomButton
          label="جزئیات ->"
          onClick={() => searchModal.open("details")}
          className="bg-red-500 hover:bg-red-800"
        />
      </div>
    </>
  );
  


  
  const contentDetails = (
    <>
      <h2 className="mb-6 text-xl">جزئیات</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-gray-400">تعداد مهمان:</label>
          <input
            type="number"
            min="1"
            value={numGuests}
            placeholder="Number of guests..."
            onChange={(e) => setNumGuests(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-400">تعداد اتاق خواب:</label>
          <input
            type="number"
            min="0"
            value={numBedrooms}
            placeholder="Number of bedrooms..."
            onChange={(e) => setNumBedrooms(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-400">تعداد سرویس های بهداشتی:</label>
          <input
            type="number"
            min="0"
            value={numBathrooms}
            placeholder="Number of bathrooms..."
            onChange={(e) => setNumBathrooms(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-xl"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- تاریخ "
          onClick={() => searchModal.open("dateRange")}
        />

        <CustomButton
          label="جستجو"
          onClick={closeAndSearch}
          className=" bg-red-500 hover:bg-red-800"
        />
      </div>
    </>
  );





  if (searchModal.step == "location") {
    content = contentLocation;
  } else if (searchModal.step == "dateRange") {
    content = contentDateRange;
  } else if (searchModal.step == "details") {
    content = contentDetails;
  }




  return (
    <Modal
      label="جستجو"
      content={content}
      close={searchModal.close}
      isOpen={searchModal.isOpen}
    />
  );
};

export default SearchModal;
