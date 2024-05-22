'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true)

  const handleScroll = () => {
    const scrollY = window.scrollY
    if (scrollY > 80) { 
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full flex justify-between p-4 md:pt-8 md:px-24 text-lg md:text-[30px] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <Link href='/'>
        <div className='relative w-16 h-16 md:w-24 md:h-24'>
          <Image fill src='/ztgklogo.svg' alt='' sizes='100vw' />
        </div>
      </Link>

      <div className='flex items-center justify-center gap-2 pr-2 md:pr-0 md:gap-24'>
        <Link href={'/'} className='p-2 rounded-lg hover:ring-2 ring-red-300 hover:animate-spin hover:invert whitespace-nowrap'>
          Hover me 🧌
        </Link>
        <Link href={'/glosowanie'}>Głosowanie</Link>
      </div>
    </div>
  );
}
