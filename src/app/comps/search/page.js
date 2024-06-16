'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Product from '@/components/Product'
import ResponsiveEmbed from 'react-responsive-embed'
import Link from "next/link";
import { useRouter } from 'next/router';
import { useSearchParams } from "next/navigation";

export default function Page({}) {
    const searchParams = useSearchParams();
    const searchString = searchParams.get('searchString');
    const [productsInfo, setProductsInfo] = useState([]);
    const [sorting, setSorting] = useState(''); // Stan dla kryterium sortowania

    useEffect(() => {
        if (searchString) {
            (async () => {
                try {
                    const req = await fetch(`http://localhost:3000/api/product/search?query=${searchString}`);
                    const res = await req.json();

                    setProductsInfo(res.product);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            })();
        }
    }, [searchString]);

    // Funkcja do obsługi zmiany kryterium sortowania
    const handleSortChange = (e) => {
        const selectValue = e.target.value;
        setSorting(selectValue);

        // Kopia produktyInfo do sortowania
        const sortedProducts = [...productsInfo];

        if (selectValue === 'low') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (selectValue === 'high') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (selectValue === 'alphabetical') {
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        }

        // Ustawienie posortowanych produktów
        setProductsInfo(sortedProducts);
    };

    return (
        <main className='min-h-screen bg-dark-beige'>
            <div className="flex flex-col">
                <div className='h-32'></div>

                {/* Nawigacja */}
                <div className="bg-beige p-4 ml-16 mt-10">
                    <div className='flex items-center'>
                        <Link href="/" className="block px-4 py-2 text-green">Strona główna</Link>
                        <span className="block py-2 text-green-b">/</span>
                        <Link href="/comps/search" className="block px-4 py-2 text-green">Wyszukiwanie</Link>
                    </div>
                </div>

                {/* Sortowanie */}
                <div className="bg-dark-beige p-4 pl-16 flex items-center justify-start mb-4">
                    <span className="text-green mr-2">Sortuj według:</span>
                    <select
                        value={sorting}
                        onChange={handleSortChange}
                        className="p-2 bg-dark-beige border border-neutral-300 rounded text-green mr-2"
                    >
                        <option value="">Wybierz...</option>
                        <option value="low">Cena (rosnąco)</option>
                        <option value="high">Cena (malejąco)</option>
                        <option value="alphabetical">Alfabetycznie (tytuł)</option>
                    </select>
                </div>

                {/* Informacja o liczbie znalezionych produktów */}
                <div className="bg-dark-beige p-4 pl-16 flex items-center justify-start mb-4">
                    {productsInfo.length > 0 ? (
                        <div className="text-green">Znaleziono {productsInfo.length} produktów:</div>
                    ) : (
                        <div className="text-green">Nie znaleziono produktów.</div>
                    )}
                </div>

                <div className="flex flex-col md:flex-row items-start justify-center gap-8 p-8 w-[90%] mx-auto">
                    <div className='bg-opacity-50 rounded-lg bg-neutral-600 md:basis-3/4'>

                        {/* Mapowanie posortowanych produktów */}
                        {productsInfo.map((product) => (
                            <Product
                                key={product.id}
                                image={product.image}
                                title={product.title}
                                author={product.author}
                                category={product.category}
                                price={product.price}
                            />
                        ))}

                    </div>
                </div>
            </div>
        </main>
    )
}
