// app/food/[id]/page.tsx

import React from "react";
import apiService from "@/app/services/apiService";

const FoodDetail = async ({ params }: { params: { id: string } }) => {
  const food = await apiService.get(`/food/api/v1/fd/detail/${params.id}`);

  return (
    <main className="max-w-[1500px] flex flex-col mx-auto px-4 md:py-6 mb-14 py-2">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full md:w-[60%] px-4 md:py-10 py-2">
          <h1 className="w-fit text-2xl font-bold mb-4 border-b border-gray-400">{food.name}</h1>
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-auto mb-2 rounded-xl"
          />
          <p className="text-gray-500 mb-4">مواد لازم:{" "} {food.ingredients} </p>
          <p className="text-gray-500 mb-4">دستور پخت: {food.recipe}</p>
          {food.sections.map((section: any) => (
            <div key={section.id} className="mb-8">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-auto mb-2 rounded-xl"
              />
              <p className="font-light text-base">{section.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FoodDetail;
