'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation'

import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaBars, FaChevronDown } from 'react-icons/fa';
import { auth, provider, signInWithPopup, onAuthStateChanged, signOut } from '../../utils/firebase';

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter();

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };


  // to nie działa !!!!
  const handleSearch = () => {
    if (searchText.trim() !== '') {
      router.push(`/comps/search?searchString=${encodeURIComponent(searchText.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, displayName: user.displayName }),
      });

      //await signInWithPopup(auth, provider);
      //sczytanie liczby kredytów z bazy dla tego użytkownika
      // lub jeśli go nie ma to dodanie rekordu z nim

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
    const handleResize = () => {
      if (window.innerWidth <= 768) { // Adjust the width as per your mobile breakpoint
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);


  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user) {
    (async () => {
      console.log(user.email)
      const req = await fetch(`http://localhost:3000/api/getUser?email=${user.email}`);
      const res = await req.json()

      setUserInfo(res.user)

    })();
      }
  }, [user])

  return (
    <header className={`fixed top-0 left-0 z-50 w-full bg-beige transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="w-full flex justify-between items-center bg-green py-4 px-6">
        <div className="flex items-center">
          <Link href='/'>
            <div className={`relative ${isMobileView ? 'w-32' : 'w-48'} h-16`}>
              <Image src='/photos/logo_gem.png' alt='GEM Logo' layout="fill" className="object-contain" />
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center w-3/4 max-w-lg relative">
          <svg onClick={handleSearch} className="h-6 w-6 text-beige absolute left-3 top-2 cursor-pointer"
               fill="none" viewBox="0 0 24 24" stroke="#f5e6c8">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text"
                 placeholder="Na co masz dziś ochotę?..."
                 className="w-full bg-transparent text-beige pl-12 pr-4 py-2 border-b-4 border-beige focus:outline-none focus:border-beige"
                 value={searchText} onChange={handleInputChange} onKeyPress={handleKeyPress}/>
        </div>

        <div className="flex items-center space-x-6 mr-6">
          {user ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 focus:outline-none text-beige">
                <FaUser className="text-beige" />
                <span className="text-beige">Witaj, {user.displayName}{userInfo && userInfo.accountType == 3 && (' (Admin)'
                )}{userInfo && userInfo.accountType == 2 && (' (Wydawca)'
                )}</span>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 ml-1 text-beige" fill="none" stroke="#f5e6c8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 0v100"></path>
                  </svg>
                  <span className="text-dark-beige">{userInfo ? userInfo.creditsNumber : ''}</span>
                  <img src="/photos/gem_symbol_light.png" alt="gem" className="w-6 h-6" />
                </div>
                <svg className="w-4 h-4 ml-1 text-beige" fill="none" stroke="#f5e6c8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute top-full right-0 hidden bg-beige rounded-md border border-green-950 shadow-lg group-hover:block z-50">
                <Link href="/comps/history" className="block px-4 py-2 text-green">Historia transakcji</Link>
                <Link href="/comps/konto" className="block px-4 py-2 text-green">Moje konto</Link>
                {userInfo && userInfo.accountType > 1 && (
                <Link href="/comps/edit-products" className="block px-4 py-2 text-green">Edytuj produkty  </Link>
                )}

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
        <div className="md:hidden">
          <FaBars className="text-beige cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav className="bg-beige py-4 md:hidden">
          <div className="w-full flex justify-center items-center mt-4">
            <input type="text"
                    placeholder="Na co masz dziś ochotę?..."
                    className="w-80 bg-transparent text-black pl-4 pr-2 py-2 border-b-4 border-black focus:outline-none focus:border-black mb-3"
                    value={searchText} onChange={handleInputChange} onKeyPress={handleKeyPress}/>
             <svg onClick={handleSearch} className="h-6 w-6 text-black cursor-pointer ml-2"
                  fill="none" viewBox="0 0 24 24" stroke="#000000">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex flex-col items-center">
            <div className="px-15 text-xl text-green" onClick={() => setIsGamesOpen(!isGamesOpen)}>Gry <FaChevronDown className={`text-beige ml-1 ${isGamesOpen ? 'transform rotate-180' : ''}`} /></div>
            {isGamesOpen && (
              <div className="bg-beige py-1 w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>
                <Link href="/comps/games/1" className="block px-4 py-2 text-green">Kategoria 1</Link>
                <Link href="/comps/games/2" className="block px-4 py-2 text-green">Kategoria 2</Link>
                <Link href="/comps/games/3" className="block px-4 py-2 text-green">Kategoria 3</Link>
              </div>
            )}
            <Link href="/comps/ebooks" className="px-15 text-xl text-green" onClick={() => setIsMobileMenuOpen(false)}>E-booki</Link>
            <Link href="/comps/music" className="px-15 text-xl text-green" onClick={() => setIsMobileMenuOpen(false)}>Muzyka</Link>
            <Link href="/comps/subscriptions" className="px-15 text-xl text-green" onClick={() => setIsMobileMenuOpen(false)}>Subskrypcje</Link>
            <div className="px-15 text-xl text-green" onClick={() => setIsAboutOpen(!isAboutOpen)}>O nas <FaChevronDown className={`text-beige ml-1 ${isAboutOpen ? 'transform rotate-180' : ''}`} /></div>
            {isAboutOpen && (
              <div className="bg-beige py-1 w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>
                <Link href="/comps/about/how-it-works" className="block px-4 py-2 text-green">Jak to działa?</Link>
                <Link href="/comps/about/contact" className="block px-4 py-2 text-green">Kontakt</Link>
              </div>
            )}
          </div>
        </nav>
      )}
      {/* Normal Menu */}
      <nav className="bg-beige py-4 md:block hidden">
        <div className="w-full flex justify-around">
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
          <Link href="/comps/ebooks" className="px-15 text-xl text-green">E-booki</Link>
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
