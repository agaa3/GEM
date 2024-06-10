import Image from "next/image"
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Product(props) {
    const [showChosenPopup, setShowChosenPopup] = useState(false);
    const [showPurchasedPopup, setShowPurchasedPopup] = useState(false);
    const [showFailedPopup, setShowFailedPopup] = useState(false);

    //info o liczbie kredytów
    const credits = 3;  //to brać z bazy/navbaru

    const handleClick = () => {
        if(credits < props.price){
            setShowFailedPopup(true);
            setTimeout(() => {
                setShowFailedPopup(false);
            }, 3000);
        } else {
            setShowChosenPopup(true); // Pokaż popup po udanym wysłaniu
        }

    };

    const handleClose = () => {
        setShowPurchasedPopup(false);
    }

    const handleConfirm = () => {
        const newCredits = credits - props.price;
        //updateCredits(newCredits); zmiana stanu konta użytkownika w bazie też

        setShowChosenPopup(false);
        setShowPurchasedPopup(true); // Pokaż popup po udanym wysłaniu
    };

    const handleDeny = () => {
        setShowChosenPopup(false);
    };


    return (
        <div className="flex flex-col justify-center bg-beige p-4 ml-16">
            <div className="flex items-center">
                <div className='relative w-40 h-40 rounded-xl overflow-hidden'>
                    {/*<Image fill src="/photos/produkt01.png" alt=""  />*/}
                    {/*<Image fill src={`/${props.image}`} alt=""  />*/}
                    {/*<Image fill src={`/photos/${props.image}`} alt="" sizes="100vw" className='rounded-lg' />*/}
                    <Image fill src={props.image} alt="" className='object-cover'/>
                    <div className={`absolute top-28 right-0 px-0 py-0 text-green-b text-lg z-0 rounded-l-md w-[4.5rem] flex justify-center font-extrabold drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)] ${
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
                {/*<p className="py-2 ml-20 text-2xl text-green">{props.price}</p>*/}
                <div className="flex flex-col justify-center p-4">
                    <p className="text-xl text-green-b">{props.author}</p>
                    <p className="text-xl text-green-b">{props.title}</p>
                    <div className='flex'>
                        <span className="text-green-b text-3xl">{props.price}</span>
                        <img src="/photos/gem_symbol_dark.png" alt="gem" className="w-6 h-6 mt-1 ml-2" />
                    </div>
                </div>
                <div className="flex flex-col justify-center p-4">
                    {/*<Link href={} className="px-15 text-green">*/}
                    <button onClick={handleClick} className="mt-4 bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3" style={{ width: '200px' }}>
                        Kup teraz!
                    </button>
                    {showChosenPopup && (
                        <div className="fixed z-40 top-0 left-0 w-full h-full flex items-center justify-center">
                            <div className="bg-green text-beige text-centered h-64 w-[100%] px-4 py-2 rounded flex items-center justify-center" >
                                <ul>
                                    <li>
                                        <p className="text-center text-2xl">Czy na pewno chcesz kupić:</p>
                                    </li>
                                    <li>
                                        <p className="text-center mt-5 text-2xl">{props.title}, {props.author}?</p>
                                    </li>
                                    <li className="flex items-center justify-center">
                                        <button onClick={handleConfirm} className="mt-4 w-[40%] mx-auto bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3">
                                            Kupuję!
                                        </button>
                                        <button onClick={handleDeny} className="mt-4 w-[40%] mx-auto bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3">
                                            Rezygnuję!
                                        </button>
                                    </li>
                                </ul>



                            </div>
                        </div>
                    )}
                    {showPurchasedPopup && (
                        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center">
                            <div className="bg-green text-beige text-centered h-64 w-[50%] px-4 py-2 rounded flex items-center justify-center" >
                                <ul className="w-[80%] full">
                                    <li><p className="text-center text-2xl">Zakupiono!</p></li>
                                    <li className="flex items-center justify-center">
                                        <Link href="/comps/history" className="mt-4 w-[40%] mx-auto bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3">
                                            Twoje produkty!
                                        </Link>
                                        <button onClick={handleClose} className="mt-4 w-[40%] mx-auto bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3">
                                            Wyjdź!
                                        </button>
                                    </li>
                                    {/*<li className="flex items-center justify-center">
                                        <Link href="/comps/about/history" className="w-[40%] mx-auto">
                                            <button  className="mt-4 bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3">
                                                Twoje produkty
                                            </button>
                                        </Link>
                                        <button onClick={handleClose} className="mt-4 w-[40%] mx-auto bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3">
                                            Wyjdź
                                        </button>
                                    </li>*/}
                                </ul>
                            </div>
                        </div>
                    )}
                    {showFailedPopup && (
                        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center">
                            <div className="bg-green text-beige text-centered h-64 w-[50%] px-4 py-2 rounded flex items-center justify-center" >
                                <p className="text-center text-2xl">Masz za mało kredytów!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}