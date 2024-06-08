'use client'
import { useEffect } from "react"
import { subs } from "@/lib/subs"

const SubscriptionDisplay = ({ id }) => {
    const selectedSub = subs[id];
    if (!selectedSub) {
        return <div>Brak danych dla tego abonamentu.</div>;
    }

    useEffect(() => {
        const loadPaypalScript = () => {
            const existingScript = document.getElementById('paypal-script');
            if (!existingScript) {
                const script = document.createElement("script");
                script.id = 'paypal-script';
                script.src = "https://www.paypal.com/sdk/js?client-id=AZONjM7NkdEuKL3P2Uo6Am1ILpF7Dyebhi1uOehJUolZXwE_-9SvR_jW0mwPwuxjs9tlW77mcn-myOQv&currency=PLN";
                script.async = true;
                script.onload = renderPaypalButtons;
                document.body.appendChild(script);
            } else {
                renderPaypalButtons();
            }
        };

        const renderPaypalButtons = () => {
            if (window.paypal) {
                subs.forEach((sub, index) => {
                    if (document.getElementById(`paypal-button-container-${index}`).children.length === 0) {
                        window.paypal.Buttons({
                            createOrder: (data, actions) => {
                                return actions.order.create({
                                    purchase_units: [{
                                        amount: {
                                            value: sub.price,
                                        },
                                        description: sub.name,
                                    }],
                                });
                            },
                            onApprove: (data, actions) => {
                                return actions.order.capture().then((details) => {
                                    alert("Transaction completed by " + details.payer.name.given_name);
                                    // Handle successful transaction here (e.g., update database, inform user)
                                });
                            },
                            onError: (err) => {
                                console.error(err);
                                alert("An error occurred during the transaction");
                            }
                        }).render(`#paypal-button-container-${index}`);
                    }
                });
            }
        };

        loadPaypalScript();
    }, [id]);

    return (
        <div className='bg-opacity-50 rounded-lg bg-neutral-600 md:basis-3/4'>
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
                <div id={`paypal-button-container-${id}`} className="mt-4 flex" style={{ width: '200px', display: 'flex', flexDirection: 'row', gap: '10px' }}></div>
            </div>
        </div>
    );
};

export default SubscriptionDisplay;
