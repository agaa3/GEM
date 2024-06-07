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
                        props.category === 'Game1'
                            ? 'bg-gra'
                            : props.category === 'Game2'
                                ? 'bg-gra'
                                : props.category === 'Game3'
                                    ? 'bg-gra'
                                    : props.category === 'Album'
                                        ? 'bg-album'
                                        : props.category === 'E-Book'
                                            ? 'bg-book'
                                            : ''
                    }`}>
                        {props.category === 'Game1'
                            ? "Gra"
                            : props.category === 'Game2'
                                ? "Gra"
                                : props.category === 'Game3'
                                    ? "Gra"
                                    : props.category}
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
                <div className="flex flex-col justify-center p-4">
                    {/*<Link href={} className="px-15 text-green">*/}
                    <button className="mt-4 bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3" style={{ width: '200px' }}>
                        Kup teraz!
                    </button>
                    {/*</Link>*/}
                </div>
            </div>

        </div>
    )
}