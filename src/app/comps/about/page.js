import Link from "next/link";

export default function Page() {
    return (
        <main className='min-h-screen bg-dark-beige'>
            <div className="flex flex-col mt-20 ml-20 mb-20">
                <div className='h-16'></div>
                    <div className="flex flex-col bg-beige p-4 mt-10">
                        <div className='flex '>
                        <Link href="/" className="block px-4 py-2 text-green">Strona główna</Link>
                        <a className="block py-2 text-green-b">/</a>
                        <Link href="/comps/about" className="block px-4 py-2 text-green">O nas</Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">

                <p className="text-5xl text-green-b">
                    O nas
                </p>
                <p className="text-xl m-10 ml-20 mr-20 text-green-b text-centered">
                    Przedstawiany projekt to innowacyjny sklep internetowy, który łączy w sobie różnorodne formy rozrywki cyfrowej. <br/><br/>
                    Nasza oferta obejmuje <b>e-booki, muzykę do pobrania oraz klucze do gier</b>, dając Tobie, naszemu klientowi, szeroki
                    wybór rozrywki dostępnej w zasięgu kliknięcia. Jesteśmy dumni, że możemy zapewnić Ci możliwość dostępu do wspaniałych
                    produktów, które umożliwiają zarówno relaks, jak i naukę, oraz pozwalają na interakcję online z innymi. Wierzymy,
                    że nasz sklep internetowy, należący do branży rozrywkowej cyfrowej, wypełnia lukę w świecie cyfrowych produktów i usług,
                    oferując Ci <b>możliwość wyboru</b> tego, co najbardziej Cię interesuje w danym miesiącu.
                    <br/><br/>Niezależnie od tego, czy jesteś miłośnikiem literatury, melomanem czy graczem, u nas znajdziesz
                    coś dla siebie. Przekonaj się sam i dołącz do naszej cyfrowej przygody już dziś!
                </p>
                <Link href={"/comps/subscriptions"} className="w-[30%] text-green justify-center mb-10 ml-10 mr-10">
                    <button className="w-[100%] bg-beige text-green px-4 py-2 rounded hover:bg-dark-beige">
                        Subskrypcje
                    </button>
                </Link>
            </div>
        </main>
    )
}