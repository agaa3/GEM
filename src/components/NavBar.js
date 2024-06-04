'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';
import { auth, provider, signInWithPopup, onAuthStateChanged, signOut } from '../../utils/firebase';

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [user, setUser] = useState(null);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) { 
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    }
  }, []);

  return (
    <header className={`fixed top-0 left-0 z-50 w-full bg-beige transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="container mx-auto flex justify-between items-center bg-green py-4 px-6">
        <Link href='/'>
          <div className='relative w-32 h-10'>
            <Image fill src='/photos/logo_gem.png' alt='GEM Logo' sizes='100vw' />
          </div>
        </Link>

        <div className="flex items-center w-1/2 max-w-md">
          <input type="text" placeholder="Na co masz dziś ochotę?..." className="w-full bg-beige text-green-p px-4 py-2 border border-green-950 rounded-full"/>
          <button className="ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-beige" fill="none" viewBox="0 0 24 24" stroke="#f5e6c8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-6">
          {user ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 focus:outline-none text-beige">
                <FaUser className="text-beige" />
                <span className="text-beige">Witaj, {user.displayName}</span>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 ml-1 text-beige" fill="none" stroke="#f5e6c8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 0v100"></path>
                  </svg>
                  <span className="text-dark-beige">3</span>
                  <img src="/photos/gem_symbol_light.png" alt="gem" className="w-6 h-6" />
                </div>
                <svg className="w-4 h-4 ml-1 text-beige" fill="none" stroke="#f5e6c8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute top-full right-0 hidden bg-beige rounded-md border border-green-950 shadow-lg group-hover:block z-50">
                <Link href="/comps/history" className="block px-4 py-2 text-green">Historia transakcji</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100">Wyloguj</button>
              </div>

            </div>
          ) : (
            <button onClick={handleLogin} className="flex items-center space-x-2 focus:outline-none text-beige">
              <FaUser className="text-beige" />
              <span className="text-beige">Zaloguj</span>
            </button>
          )}
        </div>
      </div>

      <nav className="bg-beige py-2">
        <div className="container mx-auto flex justify-around">
          <div className="relative group">
            <Link href="/comps/games" className="flex items-center px-15 text-xl text-green">
              Gry
              <svg className="w-4 h-4 mr-1 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </Link>
            <div className="absolute top-full left-0 hidden bg-beige rounded-md border border-green-950 shadow-lg group-hover:block" style={{ width: '150px' }}>
              <Link href="/comps/games/1" className="block px-4 py-2 text-green">Kategoria 1</Link>
              <Link href="/comps/games/2" className="block px-4 py-2 text-green">Kategoria 2</Link>
              <Link href="/comps/games/3" className="block px-4 py-2 text-green">Kategoria 3</Link>
            </div>


          </div>
          <Link href="/comps/ebooks" className="px-15 text-xl text-green">Ebooki</Link>
          <Link href="/comps/music" className="px-15 text-xl text-green">Muzyka</Link>
          <Link href="/comps/subscriptions" className="px-15 text-xl text-green">Subskrypcje</Link>
          <div className="relative group">
            <Link href="/comps/about" className="flex items-center px-15 text-xl text-green">
              O nas 
              <svg className="w-4 h-4 mr-1 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </Link>
            <div className="absolute top-full right-0 hidden bg-beige rounded-md border border-green-950 shadow-lg group-hover:block" style={{ width: '150px' }}>
              <Link href="/comps/about/how-it-works" className="block px-4 py-2 text-green">Jak to działa?</Link>
              <Link href="/comps/about/contact" className="block px-4 py-2 text-green">Kontakt</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
