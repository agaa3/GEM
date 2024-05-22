'use client'
import { useEffect, useState } from 'react'
import { games } from "@/lib/games"

export default function Page() {
    const [votes, setVotes] = useState([0, 0, 0, 0]);

    const [alreadyVoted, setAlreadyVoted] = useState(false);

    const vote = async (gameNumber) => {
        const req = await fetch(`http://localhost:3000/api/vote`, {
            method: 'POST',
            body: JSON.stringify({ gameId: gameNumber }),
        });

        setAlreadyVoted(true);
    };

    const getHeight = (points, maxHeight = 200) => {
        const allVotes = votes.map((vote) => vote._count.id).reduce((a, b) => a + b);
        const percentage = points / allVotes;
        return maxHeight * percentage;
    };

    useEffect(() => {
        (async () => {
            setVotes((await (await fetch(`http://localhost:3000/api/vote`)).json()).voteCounts);
            console.log(votes);
        })();
    }, [votes, alreadyVoted]);

    return (
        <main className='min-h-screen bg-opacity-50 bg-repeat heropattern-hideout-neutral-800'>
            <div className="flex flex-col">
                <div className='h-64'></div>
                {alreadyVoted && (
                <div className='grid grid-cols-4'>
                    {votes.map((vote) => (
                        <div key={vote.gameId} className='flex items-baseline h-48'>
                            <div 
                                className='flex items-baseline justify-center w-16 mx-auto bg-white drop-shadow-lg'
                                style={{
                                    height: (100 * vote._count.id / 48),
                                }}
                            >
                                <div className='text-xl text-center text-neutral-800'>{vote._count.id}</div>
                            </div>
                        </div>
                    ))}
                </div>
                )}
                    <div className='flex justify-around p-4 mt-16 bg-opacity-50 rounded-lg bg-neutral-800'>
                        {games.map((game, index) => (
                            <button key={index} disabled={alreadyVoted} type="button" onClick={() => vote(game.id)} className='w-64 p-4 text-xl font-bold bg-red-500 rounded-lg shadow-md cursor-pointer hover:animate-pulse hover:ring-4 ring-inset ring-amber-200'>
                                {game.title}
                            </button>    
                        ))}
                </div>
            </div>
        </main>
    )
}
