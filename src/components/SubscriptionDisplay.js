'use client'
import { useEffect, useState } from "react";
import { subs } from "@/lib/subs";

import { useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";
import { FaUser, FaBars, FaChevronDown } from 'react-icons/fa';
import { auth, provider, signInWithPopup, onAuthStateChanged, signOut } from '../../utils/firebase';


const SubscriptionDisplay = ({ id }) => {
    const searchParams = useSearchParams();
    const data = searchParams.get('data');

    const router=useRouter();

    const [userInfo, setUserInfo] = useState(JSON.parse(data))
    //const [paypalButtonCreated, setPaypalButtonCreated] = useState(false);
    const selectedSub = subs[id];
    const [user, setUser] = useState(null);
    //const [subscriptionType, setSubscriptionType] = useState("Nieaktywna");
    const [showHaveSubPopup, setShowHaveSubPopup] = useState(false);
    const [showNotLoggedPopup, setShowNotLoggedPopup] = useState(false);
    const [showPurchasedPopup, setShowPurchasedPopup] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);

    // Check user authentication status
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                try {
                    const req = await fetch(`http://localhost:3000/api/getUser/?email=${currentUser.email}`);
                    const data = await req.json();
                    //console.log(data);
                    setUserInfo(data.user);

                } catch (error) {
                    console.error("Error logging in: ", error);
                }
            } else {
                setUser(null);
                //setSubscriptionType("Nieaktywna");
            }
        });

        return () => unsubscribe();
    }, []);

    const handleClick = () => {
        console.log(userInfo.subscriptionType);
        if (!user) {
            setShowNotLoggedPopup(true); // Pokaż popup po udanym wysłaniu
            setTimeout(() => {
                setShowNotLoggedPopup(false);
            }, 3000);
        } else if(userInfo.subscriptionType === "Nieaktywna" || userInfo.subscriptionType === undefined){
            setShowConfirmPopup(true);
        } else {
            setShowHaveSubPopup(true); // Pokaż popup po udanym wysłaniu
            setTimeout(() => {
                setShowHaveSubPopup(false);
            }, 3000);
            //setShowConfirmPopup(true);
        }

    };

    const handleConfirm = async () => {
        const updatedUser = { ...userInfo,
            subscriptionType: selectedSub.name,
            creditsNumber: userInfo.creditsNumber + selectedSub.credits};
        /*console.log(updatedUser.subscriptionType);
        console.log(updatedUser.id);
        console.log(updatedUser.email);
        console.log(updatedUser.login);*/

        const req = await fetch(`http://localhost:3000/api/user/`, {method: 'PUT', body: JSON.stringify(updatedUser)})

        if (req.status === 200) {
            setShowConfirmPopup(false);
            setShowPurchasedPopup(true); // Pokaż popup po udanym wysłaniu
            setTimeout(() => {
                setShowPurchasedPopup(false);
            }, 3000);
            router.push("/");
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
        }

    };
    const handleDeny = () => {
        setShowConfirmPopup(false);
    };

    return (
        <div className='bg-opacity-50 rounded-lg bg-neutral-600 md:basis-3/4 m-4'>
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
                <button 
                    className="mt-4 bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3" 
                    style={{ width: '300px' }}
                    onClick={handleClick}
                >
                    Kup teraz!
                </button>
                {/*{isActive && <div id={`paypal-button-container-${id}`} className="mt-4" style={{ width: '300px' }}></div>}*/}
                {showConfirmPopup && (
                    <div className="fixed z-40 top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="bg-green text-beige text-centered h-64 w-[100%] px-4 py-2 rounded flex items-center justify-center" >
                            <ul>
                                <li>
                                    <p className="text-center text-2xl">Czy na pewno chcesz kupić</p>
                                </li>
                                <li>
                                    <p className="text-center mt-3 text-2xl">
                                        subskrypcję&nbsp;
                                        {id === 0
                                            ? "Starter"
                                            : id === 1
                                                ? "Premium"
                                                : "GEM"}?</p>
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
                            </ul>
                        </div>
                    </div>
                )}
                {showHaveSubPopup && (
                    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="bg-green text-beige text-centered h-64 w-[50%] px-4 py-2 rounded flex items-center justify-center" >
                            <p className="text-center text-2xl">Już masz wykupioną subskrypcję, w celu wykupienia innego typu subskrypcji musisz anulować aktualną!</p>
                        </div>
                    </div>
                )}
                {showNotLoggedPopup && (
                    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="bg-green text-beige text-centered h-64 w-[50%] px-4 py-2 rounded flex items-center justify-center" >
                            <p className="text-center text-2xl">Aby wykupić subskrypcję musisz być zalogowany!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubscriptionDisplay;
