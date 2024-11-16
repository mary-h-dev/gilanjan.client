import React from "react";
import apiService from "@/app/services/apiService";
import BlogListDetail from "@/app/components/blog/BlogListDetail";


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

const BlogDetail = async ({ params }: { params: { id: string } }) => {
  const blog = await apiService.get(`/blog/api/v1/bg/detail/${params.id}`);

  
  return (
    <main className="max-w-[1500px] mx-auto px-4 md:py-6 mb-14 py-2">
      <div className="flex flex-col md:flex-row justify-center md:gap-10 gap-4">
        <div className="w-[full] md:w-[60%] px-4 md:py-10 py-2">
        <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-500 mb-4">{blog.meta_description}</p>
          {blog.sections.map((section: any) => (
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
        <div className="w-[full] md:w-[40%] px-4 md:py-10 py-2">
           <BlogListDetail/>
        </div>
      </div>
    </main>
  );
};



export default BlogDetail;
