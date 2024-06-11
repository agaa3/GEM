'use client'
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ads } from "@/lib/ads"

const BanerDisplay = ({ changeBackgroundColor  }) => {
    const [selectedAd, setSelectedAd] = useState(ads[0])

    const handleSelection = (ad) => {
        setSelectedAd(ad)
        changeBackgroundColor(ad.color)
    }

    return (
        <div className={`relative ${selectedAd.color} z-50 p-12`}>
            <div className="flex flex-col items-center justify-center w-full">
                <p className="text-[96px] font-bold text-center">
                    {selectedAd.title}
                </p>
                <p className="text-[32px] font-bold text-centered">
                    {selectedAd.subtitle}
                </p>
                <Link href={selectedAd.url} className="px-15 text-green">
                    <button className="mt-4 bg-beige text-green px-4 py-2 rounded hover:bg-dark-beige">
                        {selectedAd.buttonText}
                    </button>
                </Link>

            </div>
            <div className="grid items-center justify-center w-full grid-cols-2 mt-12 md:grid-cols-3">
                {ads.map((ad) => (
                    <div
                        // href={`/gra/${ad.id}`}
                        key={ad.id}
                        className="flex items-center justify-center cursor-pointer"
                        onMouseOver={() => handleSelection(ad)}
                    >
                        {/*<div className="w-1 h-1 hover:fill-amber-100">*/}
                            <svg className="w-4 h-4 text-beige" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#f5e6c8">
                                <circle cx="12" cy="12" r="10" stroke="#f5e6c8" strokeWidth="2" fill="none"/>
                            </svg>
                        {/*</div>*/}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BanerDisplay
