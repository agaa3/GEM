
'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Product from '@/components/Product'
import ResponsiveEmbed from 'react-responsive-embed'
import Link from "next/link";
import SubscriptionDisplay from "@/components/SubscriptionDisplay.js";


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

            const req = await fetch(`http://localhost:3000/api/product/ebooks`)
            const res = await req.json()

            setProductsInfo(res.product)

        })();
    }, [])


    return (
        <main className='min-h-screen bg-dark-beige'>
            <div className='h-30 h-30 bg-opacity-100'></div>
            <div className="flex flex-wrap justify-center gap-8 p-8 w-[90%] mx-auto mt-40">
                <SubscriptionDisplay id={0}/>
                <SubscriptionDisplay id={1}/>
                <SubscriptionDisplay id={2}/>
            </div>
        </main>
    )
}