'use client';
import React from 'react';
import Select from 'react-select';
import useProvinces from '@/app/hooks/useProvinces';

export type SelectProvinceValue = {
  label: string;
  value: string;
};

export interface SelectProvinceProps {
  value?: SelectProvinceValue;
  onChange: (value: SelectProvinceValue) => void;
}

const SelectProvince: React.FC<SelectProvinceProps> = ({ value, onChange }) => {
  const { getAll } = useProvinces();

  return (
    <>
      <Select
        isClearable
        placeholder="انتخاب شهر"
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as SelectProvinceValue)}
        // اضافه کردن استایل راست‌چین برای زبان فارسی
        styles={{
          input: (provided) => ({
            ...provided,
            direction: 'ltr',
          }),
          menu: (provided) => ({
            ...provided,
            direction: 'ltr',
          }),
          singleValue: (provided) => ({
            ...provided,
            direction: 'ltr',
          }),
        }}
      />
    </>
  );
};

export default SelectProvince;
