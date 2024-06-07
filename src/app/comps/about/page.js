import Link from "next/link";

export default function Page() {
    return (
        <main className='min-h-screen bg-dark-beige'>
            <div className="flex flex-col">
                <div className='h-32'></div>
                <div className="flex flex-col justify-center bg-beige p-4 ml-16 mt-10">
                    <div className='flex '>
                        <Link href="/" className="block px-4 py-2 text-green">Strona główna</Link>
                        <a className="block py-2 text-green-b">/</a>
                        <Link href="/comps/about" className="block px-4 py-2 text-green">O nas</Link>
                    </div>
                </div>
                <p className="text-5xl mt-10 text-green-b">
                    Jak to działa?
                </p>
                <p className="text-xl m-10 ml-20 mr-20 text-green-b font-bold text-centered">
                    Opisany projekt dotyczy sklepu internetowego sprzedającego e-booki, muzykę do pobrania oraz
                    klucze do gier. Sklep o takim profilu należy do branży rozrywkowej cyfrowej, która oferuje szeroki
                    zakres cyfrowych produktów i usług, zapewniających rozrywkę, edukację oraz interakcję online. Branża
                    ta obejmuje platformy o różnym przeznaczeniu, takie jak sklepy internetowe, platformy streamingowe do
                    filmów lub muzyki, platformy do gier online i wiele innych.
                </p>
            </div>
        </main>
    )
}