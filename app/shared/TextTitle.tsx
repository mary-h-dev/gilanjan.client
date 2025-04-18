import Image from "next/image";
import React from "react";

const TextTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={`mt-4 text-center ${className}`}>
      <Image
        src="/heart.png"
        alt="Heart"
        width={50}
        height={50}
        className="mx-auto mb-2"
      />
      <h6
        className={`w-fit font-light mx-auto my-2 px-3 text-center text-gray-400 border-b-2 border-gray-400`}
      >
        {title}
      </h6>
    </div>
  );
};

export default TextTitle;
