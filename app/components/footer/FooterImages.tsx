import Image from '../../shared/Image'



const FooterImages = () => {
    return (
        <div className='flex flex-col justify-start lg:items-center gap-6 order-2 lg:order-1'>
            <Image
                alt='one'
                src='/namad.png'
                className='w-20 h-20 aspect-[3/4] rounded-md bg-slate-400'
            />
            <Image
                alt='one'
                src='/download.png'
                className='w-20 h-20 aspect-[3/4] rounded-md bg-slate-400'
            />
            {/* <Image
                alt='one'
                src='/something'
                className='w-20 aspect-[3/4] rounded-md bg-slate-400'
            /> */}
        </div>
    )
}

export default FooterImages