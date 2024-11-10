import NextImage from 'next/image'

const Image = ({ className, src, alt, priority, ...rest }: { className: string, src: string, alt: string, priority?: boolean }) => {

    return (
        <div className={`relative ${className} `}>
            <NextImage
                src={src}
                alt={alt}
                priority={priority}
                fill
                {...rest}
            />
        </div>
    )
}
export default Image