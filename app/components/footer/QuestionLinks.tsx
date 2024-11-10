import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
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

const QuestionLinks = ({ data }: { data: linkGroup }) => {
    return (
        <div className="flex flex-col gap-4 order-1 lg:order-2">
            <span className="rounded-full w-fit bg-airbnbb text-white font-bold py-2 px-4 text-lg">{data.title}</span>
            <div className="mt-8 flex flex-col gap-4">
                {
                    data.links.map((link: link) => <Link
                        key={link.id}
                        href={link.link}
                        className='flex items-center group'
                    >
                        <ChevronLeft className='stroke-white w-6 group-hover:translate-x-1 duration-300' />
                        <span className='text-lg text-black/70 group-hover:text-black duration-500'>{link.title}</span>
                    </Link>
                    )}
            </div>
        </div>
    )
}

export default QuestionLinks