'use client'

import {useEffect, useState } from "react";
import GameDisplay from "@/components/GameDisplay";
import BanerDisplay from "@/components/BanerDisplay";
import { useRouter } from 'next/router';
import Product from '@/components/Product'
import Link from "next/link";

export default function Page() {
    const [productsInfo, setProductsInfo] = useState([])
    const [backgroundColor, setBackgroundColor] = useState('bg-green')

    const changeBackgroundColor = (color) => {
        setBackgroundColor(color)
    }

    useEffect(() => {
        (async () => {

            const req = await fetch(`http://localhost:3000/api/product/home`)
            const res = await req.json()

            setProductsInfo(res.product)

        })();
    }, [])

    return (
        <section className={`relative min-h-screen overflow-hidden mb-[20px] ${backgroundColor}`}>
            {/*<div className={`m-0 absolute inset-0 z-0 bg-no-repeat bg-cover bg-center opacity-100`}></div>*/}
            <div className={`relative ${backgroundColor} z-30 mt-[150px]`}>
                <BanerDisplay changeBackgroundColor={changeBackgroundColor} />
            </div>
            <div className="flex flex-col bg-beige z-40">
                <p className="text-[32px] font-bold text-center text-green-b mt-7">
                    W tym tygodniu polecamy:
                </p>
                <div className="flex flex-col md:flex-row items-start justify-center gap-8 p-8 w-[90%] mx-auto">
                    <div className='bg-opacity-50 rounded-lg bg-neutral-600 md:basis-3/4'>

                        {productsInfo.map((product) => (
                            <Product image={product.image} key={product.id} title={product.title} author={product.author} category={product.category} price={product.price}/>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    )
}
