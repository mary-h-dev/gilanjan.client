import { useRouter } from "next/navigation";

export type SectionFoodType = {
  id: number;
  title: string;
  image: string;
  description: string;
  order: number;
};

export type FoodType = {
  id: string;
  name: string;
  slug: string;
  category: string;
  author: string;
  ingredients: string;
  recipe: string;
  image: string;
  is_active: boolean;
  tags: string[];
  created_date: string;
  updated_date: string;
  sections: SectionFoodType[];
};

type CardProps = {
  food: FoodType;
  bgColor: string;
};

export const FoodCard = ({ food, bgColor }: CardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/food/${food.id}`)}
      className={`w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full ${bgColor} flex items-center justify-center`}
    >
      <div className="text-center">
        <p className="text-white text-sm md:text-base font-medium">
          {food.category}
        </p>
        <p className="text-white text-xl md:text-3xl font-semibold mt-2">
          {food.name}
        </p>
      </div>
    </div>
  );
};
