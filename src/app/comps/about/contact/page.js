'use client'
import { useState } from 'react';
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../map'), {
    ssr: false,
});


export default function Page() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleCheckboxChange = (e) => {
        setIsTermsAccepted(e.target.checked);
    };

    const isFormValid = () => {
        return formData.name && formData.email && formData.subject && formData.message && isTermsAccepted;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) return;

        // Symulacja udanego wysłania formularza i czyszczenie inputów
        setShowSuccessPopup(true);
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        setIsTermsAccepted(false);

        // Wyczyszczenie popupu po 3 sekundach - za szybko to jakos znika uchhhhhhh
        setTimeout(() => {
            setShowSuccessPopup(false);
        }, 90000);

        // Symulacja rzeczywistego wysłania danych do serwera (zakomentowana)
        /*
        e.preventDefault();
    
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                const result = await response.json();
                setResponseMessage(result.message);
                setShowSuccessPopup(true);
                setTimeout(() => {
                    setShowSuccessPopup(false);
                }, 3000);
    
                // Wyczyszczenie inputów po udanym wysłaniu
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setResponseMessage('Error submitting form');
        }
        */
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
                <div className="flex flex-row m-10 h-auto">
                    <div className={`p-4 text-green-b text-2xl w-[30%] h-auto`}>
                        <p className="text-5xl mt-5 text-green-b mb-5">
                            Kontakt
                        </p>
                        <address>
                            <span className="text-3xl" style={{ fontWeight: 'bold' }}>GEM</span><br />
                            <br />ul. Ulicowa 123/45,<br />
                            00-000 Warszawa<br />
                            <a href="tel:+48111222333" className="block">+48 111 222 333</a>
                            <a href="mailto:gem@gmail.com" className="block">gem@gmail.com</a>
                        </address>
                    </div>
                    <div className="w-[70%] h-auto">
                        <Map />
                    </div>
                </div>
                <div className="bg-beige p-8 rounded-lg shadow-md w-[70%] mt-2 mx-auto text-center">
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
                                className="w-[90%] text-green-b px-3 py-2 border rounded"
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
                                className="w-[90%] text-green-b px-3 py-2 border rounded"
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
                                className="w-[90%] text-green-b px-3 py-2 border rounded"
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
                                className="w-[90%] text-green-b px-3 py-2 border rounded h-32"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-green-b mb-2">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={isTermsAccepted}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                Potwierdzam, że akceptuję&nbsp;
                                <a href="/Regulamin_Sklepu_Internetowego_GEM.pdf" className="text-green" download>
                                    Regulamin
                                </a>
                                . Potwierdzam również, że zapoznałem/am się z&nbsp;
                                <a href="/Informacja_o_przetwarzaniu_danych_osobowych_GEM.pdf" className="text-green" download>
                                    Informacją o przetwarzaniu danych osobowych
                                </a>&nbsp;i&nbsp;
                                <a href="/Polityka_prywatnosci_GEM.pdf" className="text-green" download>
                                    Polityką Prywatności
                                </a>.
                            </label>
                        </div>
                        <div className="text-center">
                            <button type="submit"
                                    className="mt-4 bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3" style={{ width: '200px' }} disabled={!isFormValid()}>
                                Wyślij
                            </button>
                        </div>
                    </form>
                    {/* Popup po udanym wysłaniu */}
                    {showSuccessPopup && (
                        <div className="fixed z-40 top-0 left-0 w-full h-full flex items-center justify-center">
                            <div className="bg-green text-beige text-centered h-64 w-[50%] px-4 py-2 rounded flex items-center justify-center" >
                                <p className="text-center text-2xl">Udało się wysłać wiadomość!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
