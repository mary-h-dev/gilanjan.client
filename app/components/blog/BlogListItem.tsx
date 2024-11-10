// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const customLoader = ({ src }: { src: string }) => {
//   return src;
// };


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

// type BlogListItemProps = {
//   blog: BlogType;
// };





// const BlogListItem: React.FC<BlogListItemProps> = ({ blog }) => {
//   const router = useRouter();
//   return (
//     <div className="border rounded-lg p-4 shadow-md">
//       <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
//       <p className="text-gray-600 mb-2">{blog.meta_description}</p>
//       {blog.sections && blog.sections.length > 0 && (
//         <img
//           src={blog.sections[0].image}
//           alt={blog.sections[0].title}
//           className="w-full h-48 object-cover mb-2"
//         />
//       )}
//       <div
//         className="text-blue-500 hover:underline"
//       onClick={() => router.push(`/blog/${blog.id}`)}>
//       ادامه مطلب
//       </div>
//     </div>
//   );
// };

// export default BlogListItem;



// ExpandableCardDemo.tsx

"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-click";



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



type ExpandableCardDemoProps = {
  blogs: BlogType[];
};

export function ExpandableCardDemo({ blogs }: ExpandableCardDemoProps) {
  const [active, setActive] = useState<BlogType | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 h-full w-full z-50"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                {active.sections && active.sections.length > 0 && (
                  <Image
                    priority
                    width={200}
                    height={200}
                    src={active.sections[0].image}
                    alt={active.sections[0].title}
                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  />
                )}
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.meta_description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.meta_description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={`/blog/${active.id}`}
                    className="px-2 py-3 text-sm rounded-full font-bold bg-green-500 text-white text-center"
                  >
                    ادامه مطلب
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400"
                  >
                    {active.sections &&
                      active.sections.map((section) => (
                        <div key={section.id}>
                          <h4 className="font-bold">{section.title}</h4>
                          <p>{section.description}</p>
                        </div>
                      ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {blogs.map((blog) => (
          <motion.div
            layoutId={`card-${blog.title}-${id}`}
            key={blog.id}
            onClick={() => setActive(blog)}
            className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${blog.title}-${id}`}>
                {blog.sections && blog.sections.length > 0 && (
                  <Image
                    width={100}
                    height={100}
                    src={blog.sections[0].image}
                    alt={blog.sections[0].title}
                    className="h-20 w-full rounded-lg object-cover object-top"
                  />
                )}
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${blog.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {blog.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${blog.meta_description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-justify md:text-left text-base"
                >
                  {blog.meta_description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
