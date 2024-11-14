"use client";

import React from "react";
import Image from "next/image";

import { ChangeEvent, useState } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import Categories from "../addproperty/Categories";

import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import { SelectProvinceValue } from "../../../types/index";

import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import SelectProvince from "../forms/SelectProvince";
import { useSnackbar } from "notistack";
import { Loader } from "lucide-react";
import FileInput from "../FileInput";

const AddPropertyModal = () => {
  //
  // States

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [dataCategory, setDataCategory] = useState("");
  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataPrice, setDataPrice] = useState("");
  const [dataBedrooms, setDataBedrooms] = useState("");
  // const [dataBathrooms, setDataBathrooms] = useState("");
  const [dataBuildingsmeter, setDataBuildingsmeter] = useState("");
  const [dataFloorareameters, setdataFloorareameters] = useState("");
  const [dataGuests, setDataGuests] = useState("");
  const [dataCountry, setDataCountry] = useState<SelectProvinceValue>();
  const [dataImages, setDataImages] = useState<File[]>([]); // تغییر به آرایه فایل‌ها
  const [isLoading, setIsLoading] = useState(false);

  //
  //

  const addPropertyModal = useAddPropertyModal();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  //
  // Set datas


  const setCategory = (category: string) => {
    setDataCategory(category);
  };



  const setImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      setDataImages(filesArray);
    }
  };



  const submitForm = async () => {
    console.log("submitForm");
    setIsLoading(true);

    if (
      dataCategory &&
      dataTitle &&
      dataDescription &&
      dataPrice &&
      dataCountry &&
      dataImages.length > 0 // اصلاح اعتبارسنجی
    ) {
      const formData = new FormData();
      formData.append("category", dataCategory);
      formData.append("title", dataTitle);
      formData.append("description", dataDescription);
      formData.append("price_per_night", dataPrice);
      formData.append("bedrooms", dataBedrooms);
      // formData.append("bathrooms", dataBathrooms);
      formData.append("buildingsmeter",dataBuildingsmeter);
      formData.append("floorareameters", dataFloorareameters);
      formData.append("guests", dataGuests);
      formData.append("country", dataCountry.label);
      formData.append("country_code", dataCountry.value);

      dataImages.forEach((imageFile, index) => {
        const fieldName = index === 0 ? "image" : `image${index}`;
        formData.append(fieldName, imageFile);
      });

      const response = await apiService.post(
        "/properties/api/v1/create/",
        formData
      );

      if (response.success) {
        console.log("SUCCESS :-D");
        enqueueSnackbar("با موفقیت ثبت شد!", { variant: "success" });

        router.push("/?added=true");
        router.refresh();

        addPropertyModal.close();
      } else {
        console.log("Error");
        enqueueSnackbar("خطایی رخ داد. لطفاً دوباره تلاش کنید.", {
          variant: "error",
        });
        setIsLoading(false);
        const tmpErrors: string[] = [];

        for (const key in response) {
          if (Array.isArray(response[key])) {
            response[key].forEach((message: string) => {
              tmpErrors.push(`${key}: ${message}`);
            });
          } else if (typeof response[key] === "string") {
            tmpErrors.push(`${key}: ${response[key]}`);
          } else if (typeof response[key] === "object") {
            // اگر مقدار یک شیء بود، می‌توانید آن را به صورت رشته تبدیل کنید یا پیام‌های آن را استخراج کنید
            for (const subKey in response[key]) {
              const messages = response[key][subKey];
              if (Array.isArray(messages)) {
                messages.forEach((message: string) => {
                  tmpErrors.push(`${subKey}: ${message}`);
                });
              }
            }
          }
        }

        setErrors(tmpErrors);
      }
    } else {
      setIsLoading(false);

      enqueueSnackbar("لطفاً همه فیلدهای مورد نیاز را پر کنید.", {
        variant: "error",
      });

      const tmpErrors: string[] = [];

      if (!dataCategory) tmpErrors.push("دسته‌بندی را انتخاب کنید.");
      if (!dataTitle) tmpErrors.push("عنوان را وارد کنید.");
      if (!dataDescription) tmpErrors.push("توضیحات را وارد کنید.");
      if (!dataPrice) tmpErrors.push("قیمت را وارد کنید.");
      if (!dataCountry) tmpErrors.push("مکان جغرافیایی را انتخاب کنید.");
      if (dataImages.length === 0) tmpErrors.push("لطفاً حداقل یک تصویر انتخاب کنید.");

      setErrors(tmpErrors);
    }
  };





  const content = (
    <>
      {currentStep == 1 ? (
        <>
          <h2 className="mb-4 text-lg text-center text-gray-700">
            انتخاب دسته بندی مناسب
          </h2>

          <Categories
            dataCategory={dataCategory}
            setCategory={(category) => setCategory(category)}
          />

          <CustomButton label="بعدی" onClick={() => setCurrentStep(2)} />
        </>
      ) : currentStep == 2 ? (
        <div >
          <h2 className="mb-4 text-lg text-center text-gray-700">
            مکان خود را توضیح دهید
          </h2>

          <div className=" pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-400">اسم</label>
              <input
                type="text"
                value={dataTitle}
                onChange={(e) => setDataTitle(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-xl"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-gray-400">توضیحات</label>
              <textarea
                value={dataDescription}
                onChange={(e) => setDataDescription(e.target.value)}
                className="w-full h-[150px] overflow-y-auto p-2 border border-gray-400 rounded-xl"
              ></textarea>
            </div>
          </div>

          <CustomButton
            label="قبل"
            onClick={() => setCurrentStep(1)}
            className="mb-2"
          />

          <CustomButton label="بعد" onClick={() => setCurrentStep(3)} />
        </div>
      ) : currentStep == 3 ? (
        <div className="max-h-[70vh] overflow-y-auto">
          <h2 className="mb-4 text-lg text-center text-gray-700">جزئیات</h2>

          <div className="pt-3 pb-6 space-y-2">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-400">قیمت یک شبانه روز</label>
              <input
                type="number"
                value={dataPrice}
                onChange={(e) => setDataPrice(e.target.value)}
                className="w-full p-1 border border-gray-400 rounded-xl"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-gray-400">اتاق خواب</label>
              <input
                type="number"
                value={dataBedrooms}
                onChange={(e) => setDataBedrooms(e.target.value)}
                className="w-full p-1 border border-gray-400 rounded-xl"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-gray-400">بنا</label>
              <input
                type="number"
                value={dataBuildingsmeter}
                onChange={(e) => setDataBuildingsmeter(e.target.value)}
                className="w-full p-1 border border-gray-400 rounded-xl"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-gray-400">زیربنا</label>
              <input
                type="number"
                value={dataFloorareameters}
                onChange={(e) => setdataFloorareameters(e.target.value)}
                className="w-full p-1 border border-gray-400 rounded-xl"
              />
            </div>


            <div className="flex flex-col space-y-2">
              <label className="text-gray-400">تعداد(نفرات)</label>
              <input
                type="number"
                value={dataGuests}
                onChange={(e) => setDataGuests(e.target.value)}
                className="w-full p-1 border border-gray-400 rounded-xl"
              />
            </div>
          </div>

          <CustomButton
            label="قبل"
            onClick={() => setCurrentStep(2)}
            className="mb-2"
          />

          <CustomButton label="بعد" onClick={() => setCurrentStep(4)} />
        </div>
      ) : currentStep == 4 ? (
        <>
          <h2 className="mb-6 text-2xl">مکان جغرافیایی</h2>

          <div className="pt-3 pb-6 space-y-4">
            <SelectProvince
              value={dataCountry}
              onChange={(value) => setDataCountry(value as SelectProvinceValue)}
            />
          </div>

          <CustomButton
            label="قبل"
            onClick={() => setCurrentStep(3)}
            className="mb-2"
          />

          <CustomButton label="بعد" onClick={() => setCurrentStep(5)} />
        </>
      ) : (
        <div className="max-h-[70vh] overflow-y-auto">
          <h2 className="mb-4 text-lg text-center text-gray-700">تصاویر</h2>

          <div className="pt-3 pb-6 space-y-4">
             <FileInput onChange={setImages} />

            {dataImages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {dataImages.map((imageFile, index) => (
                  <div key={index} className="w-[50px] h-[50px] relative">
                    <Image
                      fill
                      alt={`تصویر آپلود شده ${index + 1}`}
                      src={URL.createObjectURL(imageFile)}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>
            )}
            {dataImages.length === 0 && (
            <p className="text-gray-500">هیچ فایلی انتخاب نشده است.</p>
        )}  
          </div>

          {errors.map((error, index) => {
            return (
              <div
                key={index}
                className="bg-red-400 p-5 mb-4 text-white rounded-xl opacity-80"
              >
                {error}
              </div>
            );
          })}

          <CustomButton
            label="قبل"
            onClick={() => setCurrentStep(4)}
            className="mb-2"
          />

          <CustomButton
            label={
              isLoading ? (
                <div className="flex items-center justify-center gap-x-2">
                  <Loader size={24} className="animate-spin" />
                </div>
              ) : (
                "ثبت "
              )
            }
            onClick={submitForm}
          />
        </div>
      )}
    </>
  );

  return (
    <>
      <Modal
        isOpen={addPropertyModal.isOpen}
        close={addPropertyModal.close}
        label="افزودن آگهی"
        content={content}
      />
    </>
  );
};

export default AddPropertyModal;
