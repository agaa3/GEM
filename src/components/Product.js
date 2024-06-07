import Image from "next/image"

export default function Product(props) {
    return (
        <div className="flex flex-col justify-center bg-beige p-4 ml-16">
            <div className="flex items-center">
                <div className='relative w-40 h-40 rounded-xl overflow-hidden'>
                    {/*<Image fill src="/photos/produkt01.png" alt=""  />*/}
                    {/*<Image fill src={`/${props.image}`} alt=""  />*/}
                    {/*<Image fill src={`/photos/${props.image}`} alt="" sizes="100vw" className='rounded-lg' />*/}
                    <Image fill src={props.image} alt="" className='object-cover'/>
                    <div className={`absolute top-28 right-0 px-0 py-0 text-green-b text-lg z-0 rounded-l-md w-[4.5rem] flex justify-center font-extrabold ${
                        props.category === 'Gra'
                            ? 'bg-gra'
                            : props.category === 'Album'
                                ? 'bg-album'
                                : props.category === 'E-Book'
                                    ? 'bg-book'
                                    : ''
                    }`}>
                        {props.category}
                    </div>
                </div>
                {/*<p className="py-2 ml-20 text-2xl text-green">{props.price}</p>*/}
                <div className="flex flex-col justify-center p-4">
                    <p className="text-xl text-green-b">{props.author}</p>
                    <p className="text-xl text-green-b">{props.title}</p>
                    <div className='flex'>
                        <span className="text-green-b text-3xl">{props.price}</span>
                        <img src="/photos/gem_symbol_dark.png" alt="gem" className="w-6 h-6 mt-1 ml-2" />
                    </div>
                    </div>
                {/*<p className="text-2xl">{props.category}</p>*/}
            </div>

        </div>
    )
}