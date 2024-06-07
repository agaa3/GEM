import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-beige text-black py-8">
            <div className="container mx-auto px-4">
                <div className="border-t border-gray-300 mb-8"></div>
                <div className="flex justify-center mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-28">
                        <div>
                            <h2 className="font-black mb-2">Kontakt</h2>
                            <address>
                                GEM<br />
                                ul. Ulicowa 123/45,<br />
                                00-000 Warszawa<br />
                                <a href="tel:+48111222333" className="block">+48 111 222 333</a>
                                <a href="mailto:gem@gmail.com" className="block">gem@gmail.com</a>
                            </address>
                        </div>
                        <div>
                            <h2 className="font-black mb-2">Centrum Obsługi Klienta</h2>
                            <ul>
                                <li className="text-green"><Link href="/comps/contact">Formularz kontaktowy</Link></li>
                                <li className="text-green">
                                    <a href="public/Regulamin GEM.pdf" download>
                                        Regulamin
                                    </a>
                                </li>
                                <li className="text-green">
                                    <a href="public/Info o dzialalnosci GEM.pdf" download>
                                        Informacje o działalności gospodarczej
                                    </a>
                                </li>
                                <li className="text-green">
                                    <a href="public/RODO.pdf" download>
                                        Informacje o ochronie danych RODO
                                    </a>
                                </li>
                                <li className="text-green">
                                    <a href="public/Polityka prywatnosci GEM.pdf" download>
                                        Polityka prywatności
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="font-black mb-2">Menu strony</h2>
                            <ul>
                                <li className="text-green"><Link href="/comps/games">Gry</Link></li>
                                <li className="text-green"><Link href="/comps/ebooks">E-Booki</Link></li>
                                <li className="text-green"><Link href="/comps/music">Muzyka</Link></li>
                                <li className="text-green"><Link href="/comps/subscriptions">Subskrypcje</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-center mb-4">
                    <Link href="https://www.facebook.com" className="inline-block mx-2" aria-label="Facebook">
                        <FaFacebookF size={20} />
                    </Link>
                    <Link href="https://www.instagram.com" className="inline-block mx-2" aria-label="Instagram">
                        <FaInstagram size={20} />
                    </Link>
                    <Link href="https://www.twitter.com" className="inline-block mx-2" aria-label="Twitter">
                        <FaTwitter size={20} />
                    </Link>
                    <Link href="https://www.youtube.com" className="inline-block mx-2" aria-label="YouTube">
                        <FaYoutube size={20} />
                    </Link>
                    <Link href="https://www.linkedin.com" className="inline-block mx-2" aria-label="LinkedIn">
                        <FaLinkedinIn size={20} />
                    </Link>
                </div>
                <div className="text-center">
                    © 2014 - 2024 GEM S.A. Wszelkie prawa zastrzeżone. NIP 00470550013 - REGON: 257143 - kapitał zakładowy 25 090 000 € opłacony w całości
                </div>
            </div>
        </footer>
    );
}
