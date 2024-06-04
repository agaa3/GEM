'use client'

import { useState } from "react";
import GameDisplay from "@/components/GameDisplay";
import BanerDisplay from "@/components/BanerDisplay";

export default function Page() {

    const [backgroundColor, setBackgroundColor] = useState('bg-green')

    const changeBackgroundColor = (color) => {
        setBackgroundColor(color)
    }

    return (
        <section className="relative min-h-screen overflow-hidden mb-[20px]">
            {/*<div className='absolute inset-0 z-20 via-transparent to-transparent opacity-80'></div>*/}
            {/*<div className='absolute inset-0 z-10 w-full min-h-full bg-no-repeat bg-cover bg-kropki opacity-80'></div>*/}
            <div className={`m-0 absolute inset-0 z-0 bg-no-repeat bg-cover bg-center ${backgroundColor} opacity-100`}></div>
            <div className="relative ${backgroundColor} z-30">
                <BanerDisplay changeBackgroundColor={changeBackgroundColor} />
            </div>
        </section>
    )
}
