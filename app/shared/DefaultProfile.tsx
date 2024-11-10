import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

const DefaultProfile = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        'relative flex aspect-square w-full max-w-[250px] flex-none items-center justify-center overflow-hidden rounded-full',
        className
      )}
    >
      <Image
        alt='default image'
        src='/profile.png'
        className='h-full w-full'
        fill
      />
    </div>
  )
}

export default DefaultProfile
