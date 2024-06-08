'use client'
import { useEffect, useState } from 'react'
import Link from "next/link";
import SubscriptionDisplay from "@/components/SubscriptionDisplay";
import { subs } from "@/lib/subs"; // Dodaj ten import

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
            <div className='h-32 bg-opacity-100'></div>
            <div className="flex flex-col justify-center bg-beige p-4 ml-16 mt-10">
                <div className='flex '>
                    <Link href="/" className="block px-4 py-2 text-green">Strona główna</Link>
                    <a className="block py-2 text-green-b">/</a>
                    <Link href="/comps/subscriptions" className="block px-4 py-2 text-green">Subskrypcje</Link>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-8 p-8 w-[90%] mx-auto">
                {subs.map((sub, index) => (
                    <SubscriptionDisplay key={index} id={index} />
                ))}
            </div>
        </main>
    )
}
