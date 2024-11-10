import React from 'react'
import { Heart } from 'lucide-react'

const Like = ({ readOnly, count }: { readOnly?: boolean; count: number }) => {
  return (
    <div className='flex items-center gap-0.5 text-xs lg:text-sm 2xl:text-base'>
      <span className='text-xs'>{count}</span>
      <Heart
        className={`aspect-square w-3 lg:w-4 2xl:w-4 ${
          !readOnly ? 'cursor-pointer hover:fill-red-500 hover:stroke-red-500' : 'cursor-default'
        }`}
      />
    </div>
  )
}

export default Like
