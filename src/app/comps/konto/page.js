'use client'

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";
 import { auth, provider, signInWithPopup, onAuthStateChanged, signOut } from '../../../../utils/firebase';

export default function Page({ params }) {
    const searchParams = useSearchParams();
    const data = searchParams.get('data');

    const router=useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [userInfo, setUserInfo] = useState(JSON.parse(data))
    const [hasSub, setHasSub] = useState(false);
    // Obsługa anulowania subskrypcji
    const handleCancelSubscription = () => {
        setShowPopup(true)
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const handleSubRemoval = async () => {
        const updatedUser = { ...userInfo, subscriptionType: "Nieaktywna" };

        const req = await fetch(`http://localhost:3000/api/user/`, {method: 'PUT', body: JSON.stringify(updatedUser)})

        if (req.status === 200) {
            setHasSub(false);
            setUserInfo((prevInfo) => ({ ...prevInfo, subscriptionType: "Nieaktywna" }));
            setShowPopup(false);
            setShowConfirmPopup(true); // Pokaż popup po udanym anulowaniu
            setTimeout(() => {
                setShowConfirmPopup(false);
            }, 3000);
            //router.push("/");
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
        }

    };


    const [googleUser, setGoogleUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setGoogleUser(currentUser);
                try {
                    const req = await fetch(`http://localhost:3000/api/getUser/?email=${currentUser.email}`);
                    const data = await req.json();
                    console.log(data);
                    setUserInfo(data.user);
                    if((userInfo.subscriptionType === "STARTER") || (userInfo.subscriptionType === "PREMIUM") ||(userInfo.subscriptionType === "GEM")){
                        setHasSub(true);
                    }
                    console.log(hasSub);
                } catch (error) {
                    console.error("Error logging in: ", error);
                }
            } else {
                setGoogleUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <main className='min-h-screen bg-dark-beige h-auto'>

            <div className="flex flex-col mt-20 ml-20 mb-20">
                <div className='h-16'></div>
                <div className="flex flex-col bg-beige p-4 mt-10">
                    <div className='flex '>
                        <Link href="/" className="block px-4 py-2 text-green">Strona główna</Link>
                        <a className="block py-2 text-green-b">/</a>
                        <Link href="/comps/konto" className="block px-4 py-2 text-green">Moje konto</Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-7xl font-bold text-green-b mb-4">Moje konto</h1>
                <p className="mb-2 text-3xl text-green-b">Email: {googleUser ? googleUser.email : ''}</p>
                <p className="mb-4 text-3xl text-green-b">Typ subskrypcji: {userInfo ? userInfo.subscriptionType : 'Nieaktywna'}</p>
                {(userInfo ? ((userInfo.subscriptionType === "STARTER") ||
                    (userInfo.subscriptionType === "PREMIUM") ||
                    (userInfo.subscriptionType === "GEM")): false)
                    && (
                    <button onClick={handleCancelSubscription} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Anuluj subskrypcję
                    </button>
                )}
                {showPopup && (
                    <div className="fixed z-40 top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="bg-green text-beige text-centered h-64 w-[100%] px-4 py-2 rounded flex items-center justify-center" >
                            <ul>
                                <li>
                                    <p className="text-center text-2xl">Czy na pewno chcesz zrezygnować z subskrypcji?</p>
                                </li>
                                <li>
                                    <p className="text-center mt-5 text-2xl">Zebrane kredyty będą ważne jeszcze przez okres 14 dni przed zniknięciem z konta!</p>
                                </li>
                                <li className="flex items-center justify-center">
                                    <button onClick={handlePopupClose} className="mt-4 w-[40%] mx-auto bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3">
                                        Wróć
                                    </button>
                                    <button onClick={handleSubRemoval} className="mt-4 w-[40%] mx-auto bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3">
                                        Anuluj subskrypcję!
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {showConfirmPopup && (
                    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="bg-green text-beige text-centered h-64 w-[50%] px-4 py-2 rounded flex items-center justify-center" >
                            <ul className="w-[80%] full">
                                <li><p className="text-center text-2xl">Anulowano subskrypcję!</p></li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};
