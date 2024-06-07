import '@/styles/globals.css'

import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'

export const metadata = {
    title: 'GEM',
    description: 'rozrywka online',
};

export default function RootLayout({ children }) {
    return (
        <html lang="pl">
            <body className='bg-neutral-900'>
                <NavBar />
                    {children}
                <Footer />
            </body>
        </html>
    );
}
