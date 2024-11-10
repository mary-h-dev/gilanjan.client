import Link from 'next/link'
import React from 'react'


const NotFoundPage = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-gradient-to-r from-primary-one from-[40%] to-sky-500'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-gray-400'>404</h1>
        <p className='my-4 text-lg text-gray-400'>متاسفانه صفحه ای که به دنبال آن هستید یافت نشد</p>
        <Link
          href={'/'}
          className='mt-10 p-4 text-lg text-secondary-two bg-airbnbb rounded-full'
        >
          بازگشت به صفحه اصلی 
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
