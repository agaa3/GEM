import Link from "next/link";

export default function Page() {
    return (
        <main className='min-h-screen bg-dark-beige'>
            <div className="flex flex-col m-20">
                <div className='h-16'></div>
                <div className="flex flex-col justify-center bg-beige p-4 mt-10">
                    <div className='flex '>
                        <Link href="/" className="block px-4 py-2 text-green">Strona główna</Link>
                        <a className="block py-2 text-green-b">/</a>
                        <Link href="/comps/about" className="block px-4 py-2 text-green">O nas</Link>
                        <a className="block py-2 text-green-b">/</a>
                        <Link href="/comps/how-it-works" className="block px-4 py-2 text-green">Jak to działa?</Link>
                    </div>
                </div>
                <p className="text-5xl mt-10 text-green-b">
                    Jak to działa?
                </p>
                <p className="text-xl mt-10 text-green-b font-bold text-centered">
                   Jesteśmy sklepem internetowym zajmującym się sprzedażą e-booków,
                    muzyki oraz kluczy do gier do pobrania. Pliki pobrane z naszej strony można zatrzymać już na zawsze,
                    jednak zakup treści nie zwalnia użytkowników z przestrzegania praw autorskich.
                </p>
                <p className="text-xl mt-10 text-green-b font-bold text-centered">
                    Każdy produkt z oferty ma przypisaną ilość kredytów, za które można go zakupić.
                    W tym celu, należy wykupić jeden z modeli subskrypcji:
                </p>
                <ul className="text-xl ml-10 mr-10 mt-10 text-green-b font-bold text-centered">
                    <li>20 zł - 1 kredyt miesięcznie - Starter</li>
                    <li>55 zł - 3 kredyty miesięcznie - Premium</li>
                    <li>170 zł - 10 kredytów miesięcznie - GEM</li>
                </ul>
                <p className="text-xl mt-10 text-green-b font-bold text-centered">
                    Po wykupieniu subskrypcji, zgromadzone kredyty można wydać zgodnie z poniższą listą:
                </p>
                <ul className="text-xl ml-10 mr-10 mt-10 text-green-b font-bold text-centered">
                    <li>Ebook - 1 kredyt</li>
                    <li>Muzyka (Albumy .mp3) - 1 kredyt</li>
                    <li>Gra z kategorii 1 - 1 kredyt</li>
                    <li>Gra z kategorii 2 - 4 kredyty</li>
                    <li>Gra z kategorii 3 - 8 kredytów</li>
                    <li>Bundle tematyczny składający się z różnych produktów z różnych kategorii - 3 kredyty</li>
                </ul>
                <p className="text-xl mt-10 mb-10 text-green-b font-bold text-centered">
                    Dodatkowo, co miesiąc na stronie pojawia się oferta na produkty z szczególnych
                    kategorii obejmujących ebooki, muzykę oraz gry (np. fantasy, chill…).
                   Nie ma obowiązku wydawać kredytów w określonym czasie - będą się one
                    gromadzić na jego koncie.
                    Subskrypcje będą odnawiane automatycznie, do momentu anulowania przez użytkownika. Po
                    zakończeniu subskrypcji, zebrane kredyty są ważne jeszcze przez okres 14 dni przed zniknięciem z konta.
                    W celu pozyskiwania produktów zawierane są umowy z wydawcami książek, wytwórniami
                    muzycznymi i producentami gier, aby uzyskać licencje na dystrybucję ich treści cyfrowych. Te umowy
                    obejmują określone tytuły, autorskie dzieła lub całe katalogi. Wydawcy posiadają dostęp do strony
                    i mogą dodawać, usuwać oraz modyfikować swoje produkty.
                </p>
            </div>
        </main>
    )
}