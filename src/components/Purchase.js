import Image from "next/image"
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Purchase(props) {
    const [showDownloadPopup, setShowDownloadPopup] = useState(false);
    // const [showPurchasedPopup, setShowPurchasedPopup] = useState(false);
    // const [showFailedPopup, setShowFailedPopup] = useState(false);

    const handleClick = () => {
        setShowDownloadPopup(true);
        setTimeout(() => {
            setShowDownloadPopup(false);
        }, 3000);
    };


    return (
        <div className="flex flex-col justify-center bg-beige p-4 ml-16">
            <div className="flex items-center">
                <div className='relative w-40 h-40 rounded-xl overflow-hidden'>
                    <Image fill src={props.image} alt="" className='object-cover'/>
                    <div className={`absolute top-28 right-0 px-0 py-0 text-green-b text-lg z-0 rounded-l-md w-[4.5rem] flex justify-center font-extrabold ${
                        props.category === 'Game1'
                            ? 'bg-gra'
                            : props.category === 'Game2'
                                ? 'bg-gra'
                                : props.category === 'Game3'
                                    ? 'bg-gra'
                                    : props.category === 'Album'
                                        ? 'bg-album'
                                        : props.category === 'E-Book'
                                            ? 'bg-book'
                                            : ''
                    }`}>
                        {props.category === 'Game1'
                            ? "Gra"
                            : props.category === 'Game2'
                                ? "Gra"
                                : props.category === 'Game3'
                                    ? "Gra"
                                    : props.category}
                    </div>
                </div>
                <div className="flex flex-col justify-center p-4">
                    <p className="text-xl text-green-b">{props.author}</p>
                    <p className="text-xl text-green-b">{props.title}</p>
                    <div className='flex'>
                        <span className="text-green-b text-3xl">{props.price}</span>
                        <img src="/photos/gem_symbol_dark.png" alt="gem" className="w-6 h-6 mt-1 ml-2" />
                    </div>
                    <p className="text-xl text-green-b">{props.date}</p>

                </div>
                <div className="flex flex-col justify-center p-4">
                    <a onClick={handleClick} href={props.downloadURL} download className="mt-4 bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3" style={{ width: '200px' }}>
                        Pobierz
                    </a>
                    {showDownloadPopup && (
                        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center">
                            <div className="bg-green text-beige text-centered h-64 w-[50%] px-4 py-2 rounded flex items-center justify-center" >
                                <p className="text-center text-2xl">Pobrano!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}