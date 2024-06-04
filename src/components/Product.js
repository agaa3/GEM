import Image from "next/image"

export default function Product(props) {
    return (
        <div className="flex flex-col justify-center bg-beige p-4 ml-16">
            <div className="flex items-center">
                <div className='relative w-40 h-40'>
                    <Image fill src="/photos/produkt01.png" alt=""  />
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