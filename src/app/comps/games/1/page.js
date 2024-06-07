
'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Product from '@/components/Product'
import ResponsiveEmbed from 'react-responsive-embed'
import Link from "next/link";

export default function Page({ params }) {
    const [productsInfo, setProductsInfo] = useState([])

    const [product, setProduct] = useState({
        author: '',
        title: '',
        category: '',
        price: '',
    });



    useEffect(() => {
        (async () => {

            const req = await fetch(`http://localhost:3000/api/product/games/1`)
            const res = await req.json()

            setProductsInfo(res.product)

        })();
    }, [])


    return (
        <main className='min-h-screen bg-dark-beige'>
            <div className="flex flex-col">
                <div className='h-16 md:h-32'></div>
                <div className="flex flex-col justify-center bg-beige p-4 ml-16 mt-10">
                    <div className='flex '>
                        <Link href="/" className="block px-4 py-2 text-green">Strona główna</Link>
                        <a className="block py-2 text-green-b">/</a>
                        <Link href="/comps/games" className="block px-4 py-2 text-green">Gry</Link>
                        <a className="block py-2 text-green-b">/</a>
                        <Link href="/comps/games/1" className="block px-4 py-2 text-green">Kategoria 1</Link>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-start justify-center gap-8 p-8 w-[90%] mx-auto">
                    <div className='bg-opacity-50 rounded-lg bg-neutral-600 md:basis-3/4'>
                        {productsInfo.map((product) => (
                            <Product image={product.image} key={product.id} title={product.title} author={product.author} category={product.category} price={product.price}/>
                        ))}

                    </div>
                </div>
            </div>
        </main>
    )
}