'use client';
import React from 'react';
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import "react-multi-date-picker/styles/layouts/mobile.css"; 




interface CalendarProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
}

const MainDatePicker: React.FC<CalendarProps> = ({ value, onChange }) => {
  return (
    <DatePicker
      value={value ? new DateObject({ date: value, calendar: gregorian, locale: gregorian_en }) : null}
      onChange={(dateObject) => {
        const date = dateObject?.toDate() || null;
        onChange(date);
      }}
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      inputClass="custom-input"
      format="YYYY/MM/DD"
    />
  );
};

export default MainDatePicker;


