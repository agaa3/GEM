'use client';

import { useState } from 'react';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        isVisible && (
            <div className="fixed bottom-0 left-0 right-0 bg-dark-beige text-green p-4 flex justify-between items-center z-50">
                <p className="text-lg">Ta strona używa plików cookies w celu świadczenia usług na najwyższym poziomie. Dalsze korzystanie ze strony oznacza, że zgadzasz się na ich użycie.</p>
                <button onClick={handleClose} className="ml-4 bg-green-b text-green px-2 py-1 rounded">
                    x
                </button>
            </div>

        )
    );
};

export default CookieBanner;
