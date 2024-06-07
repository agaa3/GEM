'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Product from '@/components/Product'
import ResponsiveEmbed from 'react-responsive-embed'
import Link from "next/link";

export default function Page({}) {
    const [productsInfo, setProductsInfo] = useState([])

    const [product, setProduct] = useState({
        author: '',
        title: '',
        category: '',
        price: '',
    });



    useEffect(() => {
        (async () => {

            const req = await fetch(`http://localhost:3000/api/product/special`)
            const res = await req.json()

            setProductsInfo(res.product)

        })();
    }, [])

    return (
        <main className='min-h-screen bg-dark-beige'>
            <div className='h-32 bg-opacity-100'></div>
            <div className="flex flex-col justify-center bg-beige p-4 ml-16 mt-40">
                <div className='flex '>
                    <Link href="/" className="block px-4 py-2 text-green">Strona główna</Link>
                    <a className="block py-2 text-green-b">/</a>
                    <Link href="/comps/special" className="block px-4 py-2 text-green">Oferta specjalna</Link>
                </div>
                <div className="flex flex-col justify-center p-4">
                    <p className="font-bold text-center text-6xl text-green-b">Temat miesiąca: FANTASY</p>
                    <p className="font-bold text-center text-2xl text-green-b mt-5">Zgarnij 5 produktów w promocyjnej cenie!</p>
                    <div className='flex items-center justify-center'>
                        <span className="text-green-b text-3xl">Cena: </span>
                        <span className="text-green-b text-3xl ml-5 mr-2 line-through">5</span>
                        <span className="text-green-b text-3xl">3</span>

                        <img src="/photos/gem_symbol_dark.png" alt="gem" className="w-6 h-6 ml-2 mr-2" />
                    </div>
                    <div className="flex items-center justify-center">
                        {/*<Link href={} className="px-15 text-green">*/}
                        <button className="mt-4 bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3" style={{ width: '200px' }}>
                            Kup teraz!
                        </button>
                        {/*</Link>*/}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-start justify-center gap-8 p-8 w-[90%] mx-auto">
                    <div className='bg-opacity-50 rounded-lg bg-neutral-600 md:basis-3/4'>

                        {productsInfo.map((product) => (
                            <Product image={product.image} key={product.id} title={product.title} author={product.author} category={product.category} price={product.price}/>
                        ))}

                    </div>
                </div>
                <div className="flex items-center justify-center">
                    {/*<Link href={} className="px-15 text-green">*/}
                    <button className="mt-4 bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3" style={{ width: '200px' }}>
                        Kup teraz!
                    </button>
                    {/*</Link>*/}
                </div>
            </div>
        </main>
    )
}