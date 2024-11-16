import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BlurImage } from "../../../components/ui/apple-cards-carousel";



export type SectionType = {
    id: number;
    title: string;
    image: string;
    description: string;
    order: number;
  };
  


  export type BlogType = {
    id: string;
    title: string;
    slug: string;
    category: string;
    author: string;
    meta_description: string;
    page_meta: string;
    canonical: string;
    is_active: boolean;
    is_validated: boolean;
    tags: string[];
    created_date: string;
    updated_date: string;
    sections: SectionType[];
  };


type CardProps = {
  blog: BlogType;
  index: number;
  layout?: boolean;
};



export const BlogCard = ({ blog, index, layout = false }: CardProps) => {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.push(`/blog/${blog.id}`)}
      className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-40 w-56  md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
    >
      <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
      <div className="relative z-40 p-8">
        <p className="text-white text-sm md:text-base font-medium">
          {blog.category}
        </p>
        <p className="text-white text-xl md:text-3xl font-semibold mt-2">
          {blog.title}
        </p>
      </div>
      {blog.sections && blog.sections.length > 0 && (
        <BlurImage
          src={blog.sections[0].image}
          alt={blog.sections[0].title}
          fill
          className="object-cover absolute z-10 inset-0"
        />
      )}
    </motion.button>
  );
};
