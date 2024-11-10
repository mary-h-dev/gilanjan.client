// "use client";
// import React from "react";
// import { useEffect, useState } from "react";
// import { Skeleton } from "@mui/material";
// import WithLine from "@/app/shared/WithLine";
// import BlogListItem from "./BlogListItem";

// export type SectionType = {
//   id: number;
//   title: string;
//   image: string;
//   description: string;
//   order: number;
// };

// export type BlogType = {
//   id: string;
//   title: string;
//   slug: string;
//   category: string;
//   author: string;
//   meta_description: string;
//   page_meta: string;
//   canonical: string;
//   is_active: boolean;
//   is_validated: boolean;
//   tags: string[];
//   created_date: string;
//   updated_date: string;
//   sections: SectionType[];
// };

// const BlogListDetail: React.FC = () => {
//   const [blogs, setBlogs] = useState<BlogType[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const getBlogs = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("http://127.0.0.1:8000/blog/api/v1/bg/list");
//       const data = await response.json();
//       console.log("Blogs data:", data);
//       setBlogs(data);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getBlogs();
//   }, []);



//   return (
//     <div className="w-full h-full bg-[#f1f1f1] py-12 px-2">
//       <WithLine title="مجلات گیلان جان" />
//       {isLoading ? (
//         <div className="w-full mb-2 mt-2 grid grid-cols-1">
//           {[...Array(4)].map((_, index) => (
//             <div key={index} className="mb-4 py-12">
//               <div className="relative overflow-hidden aspect-square rounded-xl h-[300px]">
//                 <Skeleton
//                   variant="rectangular"
//                   width="100%"
//                   height="30%"
//                   style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div>
//           {blogs.map(blog => (
//             <BlogListItem key={blog.id} blog={blog} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogListDetail;



// BlogListDetail.tsx

"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import WithLine from "@/app/shared/WithLine";
import { ExpandableCardDemo } from "./BlogListItem"
// import { BlogType } from "./types";



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

const BlogListDetail: React.FC = () => {
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

  return (
    <div className="w-full h-full py-12 px-2">
      <WithLine title="مجلات گیلان جان" />
        <ExpandableCardDemo blogs={blogs} />
    </div>
  );
};

export default BlogListDetail;

