'use client'
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { subs } from "@/lib/subs"

const SubscriptionDisplay = ({ id  }) => {
    const selectedSub = subs[id];
    if (!selectedSub) {
        return <div>Brak danych dla tego abonamentu.</div>;
    }
    return (
        <div className='bg-opacity-50 rounded-lg bg-neutral-600 md:basis-3/4'>
            <div className="flex flex-col justify-center bg-beige p-4 ml-16">
                <div className="flex flex-col justify-center p-4">
                    <p className="text-xl text-green-b">{selectedSub.name}</p>
                    <p className="text-xl text-green-b">{selectedSub.price} zł / miesiąc</p>
                    <div className='flex'>
                        <span className="text-green-b text-3xl">{selectedSub.credits}</span>
                        <img src="/photos/gem_symbol_dark.png" alt="gem" className="w-6 h-6 mt-1 ml-2 mr-2" />
                        <span className="text-green-b text-3xl"> miesięcznie</span>
                    </div>
                </div>
                {/*<Link href={} className="px-15 text-green">*/}
                <button className="mt-4 bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3" style={{ width: '200px' }}>
                    Kup teraz!
                </button>
                {/*</Link>*/}

            </div>
        </div>
    )
}

export default SubscriptionDisplay
