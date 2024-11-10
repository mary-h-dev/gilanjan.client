"use client";
import React from "react";
import { useState, useEffect } from "react";
import apiService from "@/app/services/apiService";
import useLoginModal from "@/app/hooks/useLoginModal";
import { ReservationSidebarProps } from "../../../types/index";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import MainDatePicker from "../forms/MainDatePicker";
import { CalendarIcon } from "lucide-react";
import CustomButton from "../forms/CustomButton";

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
  property,
  userId,
}) => {
  const loginModal = useLoginModal();
  const [fee, setFee] = useState<number>(0);
  const [nights, setNights] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [guests, setGuests] = useState<string>("1");
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const guestsRange = Array.from(
    { length: property.guests },
    (_, index) => index + 1
  );

  const performBooking = async () => {
    if (userId) {
      if (startDate && endDate) {
        const startDateStr = startDate.toISOString().split("T")[0];
        const endDateStr = endDate.toISOString().split("T")[0];

        const formData = new FormData();
        formData.append("guests", guests);
        formData.append("start_date", startDateStr);
        formData.append("end_date", endDateStr);
        formData.append("number_of_nights", nights.toString());
        formData.append("total_price", totalPrice.toString());

        const response = await apiService.post(
          `/properties/api/v1/${property.id}/book/`,
          formData
        );

        if (response.success) {
          console.log("رزرو با موفقیت انجام شد");
          enqueueSnackbar("رزرو با موفقیت انجام شد", { variant: "success" });
          router.refresh();
        } else {
          console.log("خطایی رخ داده است...");
          enqueueSnackbar("خطایی رخ داد. لطفاً دوباره تلاش کنید.", {
            variant: "error",
          });
          router.refresh();
        }
      }
    } else {
      loginModal.open();
    }
  };



  useEffect(() => {
    if (startDate && endDate) {
      const timeDiff = endDate.getTime() - startDate.getTime();
      const dayCount = timeDiff / (1000 * 3600 * 24);
  
      if (dayCount > 0 && property.price_per_night) {
        const _fee = Math.round(((dayCount * property.price_per_night) / 100) * 5);
        const total = Math.round(dayCount * property.price_per_night + _fee);
  
        setFee(_fee);
        setTotalPrice(total);
        setNights(dayCount);
      } else {
        const _fee = Math.round((property.price_per_night / 100) * 5);
        const total = Math.round(property.price_per_night + _fee);
  
        setFee(_fee);
        setTotalPrice(total);
        setNights(1);
      }
    }
  }, [startDate, endDate]);
  



  useEffect(() => {
    console.log("State updated:", {
      fee,
      nights,
      totalPrice,
      startDate,
      endDate,
      guests,
    });
  }, [fee, nights, totalPrice, startDate, endDate, guests]);



  return (
    <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl rtl">
      <h2 className="mb-5 text-2xl">
        {property.price_per_night} تومان / هر شب
      </h2>
      <div className="flex md:flex-row items-center gap-2">
        <div className="mb-4 flex flex-col items-center justify-center ">
          <label className="mb-2 block font-bold text-xs">تاریخ شروع</label>
          <div className="flex flex-row items-center justify-center p-2 border border-gray-300 rounded-sm">
            <MainDatePicker value={startDate} onChange={setStartDate} />
            <CalendarIcon className="text-gray-300" />
          </div>
        </div>
        <div className="mb-4 flex flex-col items-center justify-center">
          <label className="mb-2 block font-bold text-xs">تاریخ پایان</label>
          <div className="flex flex-row items-center justify-center p-2 border border-gray-300 rounded-sm">
            <MainDatePicker value={endDate} onChange={setEndDate} />
            <CalendarIcon className="text-gray-300" />
          </div>
        </div>
      </div>

      <div className="mb-6 p-3 border border-gray-400 rounded-xl">
        <label className="mb-2 block font-bold text-xs">تعداد مهمانان</label>

        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full text-xm"
        >
          {guestsRange.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>
      <CustomButton label="رزرو" onClick={performBooking} />
      <div className="my-4 flex justify-between items-center">
        <p>
          {property.price_per_night} تومان × {nights} شب
        </p>

        <p>{property.price_per_night * nights} تومان</p>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <p>هزینه‌ی سرویس</p>

        <p>{fee} تومان</p>
      </div>

      <hr />

      <div className="mt-4 flex justify-between items-center font-bold">
        <p>مجموع</p>
        <p>{totalPrice} تومان</p>
      </div>
    </aside>
  );
};

export default ReservationSidebar;
