'use client'
import { useEffect, useState } from "react";
import { subs } from "@/lib/subs";

const SubscriptionDisplay = ({ id, isActive, setActiveSubIndex }) => {
    const [paypalButtonCreated, setPaypalButtonCreated] = useState(false);
    const selectedSub = subs[id];

    useEffect(() => {
        const loadPaypalScript = () => {
            if (!document.getElementById('paypal-script')) {
                const script = document.createElement("script");
                script.id = 'paypal-script';
                script.src = "https://www.paypal.com/sdk/js?client-id=AR_Mbxijvf1RLe6xqDBFr5GupDRgIzTBTB0oa1A0G7Fg-PlfXBpAlxzUZdExliXSLpP09uW4jrbXxPZW&currency=PLN";
                script.async = true;
                script.onload = () => {};
                document.body.appendChild(script);
            }
        };
        loadPaypalScript();
    }, []);

    useEffect(() => {
        if (isActive && window.paypal) {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: selectedSub.price,
                            },
                            description: selectedSub.name,
                        }],
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then((details) => {
                        alert("Transaction completed by " + details.payer.name.given_name);
                    });
                },
                onError: (err) => {
                    console.error(err);
                    alert("An error occurred during the transaction");
                }
            }).render(`#paypal-button-container-${id}`);
            setPaypalButtonCreated(true);
        }
    }, [isActive, selectedSub, id]);

    const handlePurchaseClick = () => {
        setActiveSubIndex(id);
        setPaypalButtonCreated(false); // Reset the paypalButtonCreated state
    };

    return (
        <div className='bg-opacity-50 rounded-lg bg-neutral-600 md:basis-3/4 m-4'>
            <div className="flex flex-col justify-center bg-beige p-4 ml-16">
                <div className="flex flex-col justify-center p-4">
                    <p className="text-xl text-green-b">{selectedSub.name}</p>
                    <p className="text-xl text-green-b">{selectedSub.price} zł / miesiąc</p>
                    <div className='flex'>
                        <span className="text-green-b text-3xl">{selectedSub.credits}</span>
                        <img src="/photos/gem_symbol_dark.png" alt="gem" className="w-6 h-6 mt-1 ml-2 mr-2" />
                        <span className="text-green-b text-3xl"> miesięcznie</span>
                    </div>
                </div>
                <button 
                    className="mt-4 bg-button text-button px-4 py-2 rounded border border-#7F6E4D border-3" 
                    style={{ width: '300px' }}
                    onClick={handlePurchaseClick}
                >
                    Kup teraz!
                </button>
                {isActive && <div id={`paypal-button-container-${id}`} className="mt-4" style={{ width: '300px' }}></div>}
            </div>
        </div>
    );
};

export default SubscriptionDisplay;
