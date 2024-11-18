"use client";
import React from "react";
import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { Skeleton } from "@mui/material";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import { BlogCard } from "./BlogCard";
import WithLine from "@/app/shared/WithLine";
import ImgAndTitle from "@/app/shared/ImgAndTitle";




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

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/blog/api/v1/bg/list");
      const data = await response.json();
      console.log("Blogs data:", data);
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  console.log("blogs", blogs);

  return (
    <div className="w-full h-full bg-[#f1f1f1] py-12 px-2">
    <ImgAndTitle title="مجلات گیلان جان" imageSrc="/heart.png"/>
      {isLoading ? (
    <div className="w-full mb-2 mt-2 grid grid-cols-1 md:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="mb-4 py-12">
              <div className="relative overflow-hidden aspect-square rounded-xl h-[300px]">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="30%"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Carousel
          items={blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        />
      )}
    </div>
  );
};

export default BlogList;
