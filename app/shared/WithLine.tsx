import React from 'react'

const WithLine = ({
  title,
  color,
  className,
}: {
  title: string
  className?: string
  color?: 'black' | 'white'
}) => {
  return (
    <div className={`relative z-[1] text-center ${className}`}>
      <span
        className={`absolute start-0 top-1/2 z-[-1] h-[1px] w-full translate-y-[-50%] content-[""] ${color === 'white' ? 'bg-white' : 'bg-black/60'}`}
      />
      <h6
        className={`lg:text:xl text-semibold mx-auto w-fit px-3 text-center text-xl font-bold md:px-6 xl:text-3xl text-gray-400 bg-grayMedium`}
      >
        {title}
      </h6>
    </div>
  )
}

export default WithLine
