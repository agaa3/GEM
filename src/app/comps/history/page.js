
'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Purchase from '@/components/Purchase'
import ResponsiveEmbed from 'react-responsive-embed'
import Link from "next/link";

export default function Page({ params }) {
    const [purchasesInfo, setPurchasesInfo] = useState([])

    const [purchase, setPurchase] = useState({
        id: '',
        user: '',
        author: '',
        title: '',
        category: '',
        price: '',
        date: '',
        downloadURL: '',
    });



    useEffect(() => {
        const userID = 11; //to musimy mieć

        (async () => {

            const req = await fetch(`http://localhost:3000/api/product/purchases/${userID}`)
            const res = await req.json()

            setPurchasesInfo(res.purchase)

        })();
    }, [])


    return (
        <main className='min-h-screen bg-dark-beige'>
            <div className="flex flex-col">
                <div className='h-32'></div>
                <div className="flex flex-col justify-center bg-beige p-4 ml-16 mt-10">
                    <div className='flex '>
                        <Link href="/" className="block px-4 py-2 text-green">Strona główna</Link>
                        <a className="block py-2 text-green-b">/</a>
                        <Link href="/comps/history" className="block px-4 py-2 text-green">Twoje produkty</Link>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-start justify-center gap-8 p-8 w-[90%] mx-auto">
                    <div className='bg-opacity-50 rounded-lg bg-neutral-600 md:basis-3/4'>

                        {purchasesInfo.map((purchase) => (
                            <Purchase key={purchase.id} user={purchase.user} author={purchase.author} title={purchase.title}
                            category={purchase.category} price={purchase.price} date={purchase.date}
                            downloadURL={purchase.downloadURL} image={purchase.image}/>
                        ))}

                    </div>
                </div>
            </div>
        </main>
    )
}