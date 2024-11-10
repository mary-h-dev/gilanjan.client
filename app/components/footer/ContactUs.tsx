import Image from '../../shared/Image'
import Link from 'next/link'
// import { link, linkGroup } from '../../types/index'


type linkGroup = {
    title: string
    links: link[]
    icon?: string
  }
  
  type link = {
    id: number | string
    title: string
    link: string
    icon?: string
}


const ContactUs = ({ data }: { data: linkGroup }) => {
    return (
        <div className="flex flex-col gap-4 lg:items-center order-2">
            <span className="rounded-full w-fit bg-airbnbb text-white font-bold py-2 px-4 text-lg">{data.title}</span>
            <div className='w-[200px] flex flex-col gap-4 items-center justify-start'>
                {
                    data.links.map((link: link) => <Link
                        key={link.id}
                        href={link.link}
                        title={link.title}
                        className='hover:scale-110 duration-300'
                    >
                        <Image
                            alt={link.title}
                            src={`/${link.icon}.svg`}
                            className='w-5 aspect-[3/4] rounded-md'
                        />
                    </Link>
                    )
                }
            </div>
        </div>
    )
}

export default ContactUs