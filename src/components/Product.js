import Image from "next/image"
import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {auth, onAuthStateChanged} from "../../utils/firebase";

export default function Product(props) {
    const [showChosenPopup, setShowChosenPopup] = useState(false);
    const [showPurchasedPopup, setShowPurchasedPopup] = useState(false);
    const [showFailedPopup, setShowFailedPopup] = useState(false);

    const product= props.product; // to zeby ladniej przekazywac propsy TODO

    const router = useRouter();

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

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product?")) {
            return;
        }

        const res = await fetch(`http://localhost:3000/api/product/`, {
            method: "DELETE",
            body: JSON.stringify({ id: props.id }),
        });

        if (res.status === 200) {
            window.location.reload()
        }
    };


    const handleEdit = async () => {

      router.push(`/comps/edit-products/edit?data=${JSON.stringify(props.product)}`)
    };




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
                const req = await fetch(`http://localhost:3000/api/getUser?email=${googleUser.email}`);
                const res = await req.json()

                setDatabaseUserInfo(res)

            })();
        }
    }, [googleUser])




    return (
        <div className="flex flex-col justify-center bg-beige p-4 ml-16">
            <div className="flex items-center">
                <div className='relative w-40 h-40 rounded-xl overflow-hidden'>
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
                <div className="flex flex-col justify-center p-4 w-[50%]">
                    <p className="text-xl text-green-b">{props.author}</p>
                    <p className="text-xl text-green-b">{props.title}</p>
                    <div className='flex'>
                        <span className="text-green-b text-3xl">{props.price}</span>
                        <img src="/photos/gem_symbol_dark.png" alt="gem" className="w-6 h-6 mt-1 ml-2" />
                    </div>
                </div>
                <div className="flex flex-col justify-center p-4">
                    {/*<Link href={} className="px-15 text-green">*/}
                    {(props.edit ===undefined) && <button onClick={handleClick}
                             className="mt-4 bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3"
                             style={{width: '200px'}}>
                        Kup teraz!
                    </button>}

                    {props.edit === true && <button onClick={handleEdit}
                                                     className="mt-4 bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3"
                                                     style={{width: '200px'}}>
                        Edytuj
                    </button>}{props.edit === true && databaseUserInfo && databaseUserInfo.accountType === 3 && <button onClick={handleDelete}
                                                               className="mt-4 bg-remove text-button px-4 py-2 rounded border border-#7F6E4D border-3"
                                                               style={{width: '200px'}}>
                    Usuń
                    </button>}

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