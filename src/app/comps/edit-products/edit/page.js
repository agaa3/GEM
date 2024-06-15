
'use client'
import { useState } from 'react'
import {useRouter, useSearchParams} from "next/navigation";

export default function Page({ params }) {

    const searchParams = useSearchParams();
    const data = searchParams.get('data');

    const router=useRouter();

    const [productInfo, setProductInfo] = useState(JSON.parse(data))


    const handleSubmit = async () =>{
        if (!confirm("Are you sure you want to EDIT this product?")) {
            return;
        }

        const req = await fetch(`http://localhost:3000/api/product/`, {method: 'PUT', body: JSON.stringify(productInfo)})


        if (req.status === 200) {
            router.push("/comps/edit-products");

        }

    }



    return (
        <main className='min-h-screen bg-dark-beige'>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-beige p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-gg">Edytuj produkt</h2>
                    <div className="grid grid-cols-2 gap-4 text-green">
                        <label htmlFor="author">Autor:</label>
                        <input
                            id="author"
                            value={productInfo.author}
                            onChange={e => setProductInfo({ ...productInfo, author: e.target.value })}
                            className="bg-dark-beige rounded-md p-2"
                        />
                        <label htmlFor="title">Tytuł:</label>
                        <input
                            id="title"
                            value={productInfo.title}
                            onChange={e => setProductInfo({ ...productInfo, title: e.target.value })}
                            className="bg-dark-beige rounded-md p-2"
                        />
                        <label htmlFor="category">Category:</label>
                        <select
                            id="category"
                            value={productInfo.category}
                            onChange={e => setProductInfo({...productInfo, category: e.target.value})}
                            className="bg-dark-beige rounded-md p-2"
                        >
                            <option value="Album">Album</option>
                            <option value="E-Book">E-Book</option>
                            <option value="Game1">Game1</option>
                            <option value="Game2">Game2</option>
                            <option value="Game3">Game3</option>
                        </select>
                        <label htmlFor="price">Cena:</label>
                        <input
                            id="price"
                            type="number"
                            value={productInfo.price}
                            onChange={e => setProductInfo({ ...productInfo, price: parseInt(e.target.value) })}
                            className="bg-dark-beige rounded-md p-2"
                        />
                        <label htmlFor="image">Obrazek:</label>
                        <input
                            id="image"
                            value={productInfo.image}
                            onChange={e => setProductInfo({ ...productInfo, image: e.target.value })}
                            className="bg-dark-beige rounded-md p-2"
                        />
                        <label htmlFor="downloadURL">URL do pobrania:</label>
                        <input
                            id="downloadURL"
                            value={productInfo.downloadURL}
                            onChange={e => setProductInfo({ ...productInfo, downloadURL: e.target.value })}
                            className="bg-dark-beige rounded-md p-2"
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={() => handleSubmit()}
                            className="bg-add text-beige px-4 py-2 rounded-md hover:bg-green-950"
                        >
                            ZMIEŃ
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}