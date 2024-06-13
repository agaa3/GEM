'use client'

import { useState, useEffect } from 'react';
import Link from "next/link";
 import { auth, provider, signInWithPopup, onAuthStateChanged, signOut } from '../../../../utils/firebase';

export default function Page({ params }) {

    const [showPopup, setShowPopup] = useState(false);




    // Obsługa anulowania subskrypcji
    const handleCancelSubscription = () => {
        setShowPopup(true)
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const handleSubRemoval = () => {
        ///coś tu trzeba zrobić
    };

    // const user = auth.currentUser;
    // console.log(user);
    // const [userInfo, setUserInfo] = useState(null);
    //
    // useEffect(() => {
    //     if (user) {
    //         (async () => {
    //             console.log(user.email)
    //             const req = await fetch(`http://localhost:3000/api/users?email=${user.email}`);
    //             const res = await req.json()
    //
    //             setUserInfo(res)
    //
    //         })();
    //     }
    // }, [user])

    const [googleUser, setGoogleUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setGoogleUser(user);

        });
        return unsubscribe;
    }, []);



    const [databaseUserInfo, setDatabaseUserInfo] = useState(null);

    useEffect(() => {
        if (googleUser) {
            (async () => {
                const req = await fetch(`http://localhost:3000/api/users?email=${googleUser.email}`);
                const res = await req.json()

                setDatabaseUserInfo(res)

            })();
        }
    }, [googleUser])

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
                <p className="mb-4 text-3xl text-green-b">Typ subskrypcji: {databaseUserInfo ? databaseUserInfo.subscriptionType : 'Nieaktywna'}</p>
                <button onClick={handleCancelSubscription} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Anuluj subskrypcję
                </button>
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
            </div>
        </main>
    );
};
