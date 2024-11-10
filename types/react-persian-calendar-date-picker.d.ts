// react-persian-calendar-date-picker.d.ts

declare module 'react-persian-calendar-date-picker' {
  import * as React from 'react';

  export interface Day {
    year: number;
    month: number;
    day: number;
  }

  export type SelectedDay = Day | null;

  export interface DatePickerProps {
    value: SelectedDay;
    onChange: (day: SelectedDay) => void;
    locale?: string;
    calendarClassName?: string;
    placeholder?: string;
    // ... سایر پراپ‌های موجود در مستندات کتابخانه
  }

  const DatePicker: React.FC<DatePickerProps>;

  export default DatePicker;
}
