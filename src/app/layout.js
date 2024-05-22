import '@/styles/globals.css'

import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'

export const metadata = {
    title: 'Zagłosuj na grę',
    description: 'Zagłosuj na grę',
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
