import React from 'react'
import { footerMobileLinks } from '../../constants/data'
// import { link } from '../../types/index'
import Image from '../../shared/Image'
import Link from 'next/link'

type link = {
  id: number | string
  title: string
  link: string
  icon?: string
}


const MobileFooterMenu = () => {
    return (
        <div className='flex md:hidden items-center justify-between px-4'>
            {
                footerMobileLinks.map((item: link) => <Link

                    key={item.id}
                    href={item.link}
                    className='flex flex-col gap-1 items-center justify-center'
                >
                    <Image
                        alt={item.title}
                        src={item.icon!}
                        className='w-6 h-6'
                    />
                    <span className='text-xs'>
                        {item.title}
                    </span>
                </Link>
                )
            }

        </div>
    )
}

export default MobileFooterMenu