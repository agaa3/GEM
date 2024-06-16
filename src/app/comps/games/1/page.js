'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Product from '@/components/Product'
import ResponsiveEmbed from 'react-responsive-embed'
import Link from "next/link";

export default function Page({ params }) {
    const [productsInfo, setProductsInfo] = useState([]);
    const [sorting, setSorting] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const req = await fetch(`http://localhost:3000/api/product/games/1`);
                const res = await req.json();
                setProductsInfo(res.product);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        })();
    }, []);

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
                <div className="flex flex-col justify-center bg-beige p-4 ml-16 mt-10">
                    <div className='flex '>
                        <Link href="/" className="block px-4 py-2 text-green">Strona główna</Link>
                        <a className="block py-2 text-green-b">/</a>
                        <Link href="/comps/games" className="block px-4 py-2 text-green">Gry</Link>
                        <a className="block py-2 text-green-b">/</a>
                        <Link href="/comps/games/1" className="block px-4 py-2 text-green">Kategoria 1</Link>
                    </div>
                </div>
                <div className="bg-dark-beige p-4 pl-16 flex items-center justify-start mb-4">
                    <span className="text-green mr-2">Sortuj według:</span>
                    <select
                        value={sorting}
                        onChange={handleSortChange}
                        className="p-2 bg-dark-beige border border-neutral-300 rounded text-green mr-2"
                    >
                        <option value="">Wybierz...</option>
                        <option value="low">Cena rosnąco</option>
                        <option value="high">Cena malejąco</option>
                        <option value="alphabetical">Alfabetycznie</option>
                    </select>
                </div>
                <div className="flex flex-col md:flex-row items-start justify-center gap-8 p-8 w-[90%] mx-auto">
                    <div className='bg-opacity-50 rounded-lg bg-neutral-600 md:basis-3/4'>
                        {productsInfo.map((product) => (
                            <Product
                                key={product.id}
                                id={product.id}
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
