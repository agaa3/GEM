'use client'
import { useState } from 'react';
import Link from "next/link";

export default function Page() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    //cos tu nie działa
    const handleSubmit = async (e) => {
        setShowSuccessPopup(true); // Pokaż popup po udanym wysłaniu
        // Ukryj popup po kilku sekundach
        setTimeout(() => {
            setShowSuccessPopup(false);
        }, 3000);
        e.preventDefault();

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Sprawdź, czy odpowiedź jest udana
            if (response.ok) {
                // Przeczytaj zawartość odpowiedzi tylko raz
                const result = await response.json();
                setResponseMessage(result.message);
                setShowSuccessPopup(true); // Pokaż popup po udanym wysłaniu
                // Ukryj popup po kilku sekundach
                setTimeout(() => {
                    setShowSuccessPopup(false);
                }, 3000);
            } else {
                // Obsłuż błędy odpowiedzi HTTP
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            console.log(formData.message);
            setResponseMessage('Error submitting form');
        }
    };

    return (
        <main className='min-h-screen bg-dark-beige flex items-center justify-center'>
            <div className="flexflex flex-col justify-center p-16 w-full">
                <div className="bg-dark-beige w-full mt-32"/>
                <div className="flex flex-col justify-center bg-beige p-4 mt-10">
                    <div className='flex '>
                        <Link href="/" className="block px-4 py-2 text-green">Strona główna</Link>
                        <a className="block py-2 text-green-b">/</a>
                        <Link href="/comps/about" className="block px-4 py-2 text-green">O nas</Link>
                        <a className="block py-2 text-green-b">/</a>
                        <Link href="/comps/contact" className="block px-4 py-2 text-green">Kontakt</Link>
                    </div>
                </div>
                <p className="text-5xl mt-10 text-green-b">
                    Kontakt
                </p>
                <div className="text-l mt-10 text-green-b">
                    <address>
                        GEM<br />
                        ul. Ulicowa 123/45,<br />
                        00-000 Warszawa<br />
                        <a href="tel:+48111222333" className="block">+48 111 222 333</a>
                        <a href="mailto:gem@gmail.com" className="block">gem@gmail.com</a>
                    </address>
                </div>
                <div className="bg-beige p-8 rounded-lg shadow-md w-full mt-10">
                    <h1 className="text-2xl mb-6 text-center text-green-b">Formularz Kontaktowy</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-green-b mb-2">Imię i nazwisko:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                    className="w-full text-green-b px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-green-b mb-2">Adres Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full text-green-b px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="subject" className="block text-green-b mb-2">Temat:</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full text-green-b px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-green-b mb-2">Treść:</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full text-green-b px-3 py-2 border rounded h-32"
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit"
                                    className="mt-4 bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3" style={{ width: '200px' }}>
                                Wyślij
                            </button>
                        </div>
                    </form>
                    {/* Popup po udanym wysłaniu */}
                    {showSuccessPopup && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <div className="bg-green text-beige text-centered h-64 w-[50%] px-4 py-2 rounded flex items-center justify-center" >
                                <p className="text-center text-2xl">Udało się wysłać!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
