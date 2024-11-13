'use client'
import React from 'react'

const PersianTime = ({ time }: { time: any }) => {
  const date = new Date(time)
  return (
    <span className='cursor-default text-xs'>
      {date.toLocaleDateString('fa-IR', { calendar: 'persian' })}
    </span>
  )
}

export default PersianTime
