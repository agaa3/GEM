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
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href='/'>
          <div className='relative w-32 h-10'>
            <Image fill src='/photos/gem-logo.png' alt='GEM Logo' sizes='100vw' />
          </div>
        </Link>

        <div className="flex items-center w-1/2 max-w-md">
          <input type="text" placeholder="Na co masz dziś ochotę?..." className="w-full px-4 py-2 border border-gray-300 rounded-full" />
          <button className="ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-6">
          {user ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 focus:outline-none text-black">
                <FaUser className="text-black" />
                <span className="text-black">Witaj, {user.displayName}</span>
                <svg className="w-4 h-4 ml-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute right-0 hidden mt-2 w-48 bg-white rounded-md shadow-lg group-hover:block">
                <Link href="/history" className="block px-4 py-2 text-black hover:bg-gray-100">Historia transakcji</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100">Wyloguj</button>
              </div>
            </div>
          ) : (
            <button onClick={handleLogin} className="flex items-center space-x-2 focus:outline-none text-black">
              <FaUser className="text-black" />
              <span className="text-black">Zaloguj</span>
            </button>
          )}
        </div>
      </div>

      <nav className="bg-light-beige py-2">
        <div className="container mx-auto flex justify-around">
          <div className="relative group">
            <Link href="/games" className="flex items-center px-15 text-black">
              Gry
              <svg className="w-4 h-4 mr-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </Link>
            <div className="absolute top-full left-0 hidden bg-white rounded-md shadow-lg group-hover:block" style={{ width: '150px' }}>
              <Link href="/games/category1" className="px-15 text-black block">Kategoria 1</Link>
              <Link href="/games/category2" className="px-15 text-black block">Kategoria 2</Link>
              <Link href="/games/category3" className="px-15 text-black block">Kategoria 3</Link>
            </div>
          </div>
          <Link href="/ebooks" className="px-15 text-black">Ebooki</Link>
          <Link href="/music" className="px-15 text-black">Muzyka</Link>
          <Link href="/subscriptions" className="px-15 text-black">Subskrypcje</Link>
          <div className="relative group">
            <Link href="/about" className="flex items-center px-15 text-black">
              O nas 
              <svg className="w-4 h-4 mr-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </Link>
            <div className="absolute top-full left-0 hidden bg-white rounded-md shadow-lg group-hover:block" style={{ width: '150px' }}>
              <Link href="/about/how-it-works" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Jak to działa?</Link>
              <Link href="/about/contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Kontakt</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
