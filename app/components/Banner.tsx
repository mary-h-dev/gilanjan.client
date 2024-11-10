import React from 'react';

const Banner = () => {
  return (
    <div
      className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-cover bg-center bg-mahdi"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          استان گیلان، مروارید سبز ایران
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl">
          طبیعت بکر و فرهنگ غنی را با ما تجربه کنید
        </p>
      </div>
    </div>
  );
};

export default Banner;
