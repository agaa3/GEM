'use client'

import { useState } from "react";
import GameDisplay from "@/components/GameDisplay";

export default function Page() {

    const [backgroundImage, setBackgroundImage] = useState('bg-marcin')

    const changeBackgroundImage = (image) => {
        setBackgroundImage(image)
    }

    return (
        <section className="relative min-h-screen overflow-hidden">
            <div className='absolute inset-0 z-20 bg-gradient-to-t from-black via-transparent to-transparent opacity-80'></div>
            <div className='absolute inset-0 z-10 w-full min-h-full bg-no-repeat bg-cover bg-kropki opacity-80'></div>
            <div className={`absolute inset-0 z-0 bg-no-repeat bg-cover bg-center ${backgroundImage} opacity-30`}></div>
            <div className="relative z-30">
                <GameDisplay changeBackgroundImage={changeBackgroundImage} />
            </div>
        </section>
    )
}
