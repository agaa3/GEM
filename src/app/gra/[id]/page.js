'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Comment from '@/components/Comment'
import ResponsiveEmbed from 'react-responsive-embed'

export default function Page({ params }) {
    const gameNumber = parseInt(params.id)

    const [gameInfo, setGameInfo] = useState({})
    const [commentForm, setCommentForm] = useState({
        name: '',
        comment: '',
    });

    const sendComment = async () => {
        const req = await fetch(`http://localhost:3000/api/gra`, {
            method: 'POST',
            body: JSON.stringify({ ...commentForm, gameId: gameNumber })
        });

        const newComment = await req.json()

        setGameInfo({ ...gameInfo, comments: [...gameInfo.comments, newComment.comment] })

        setCommentForm({
            name: '',
            comment: '',
        })
    }

    useEffect(() => {
        (async () => {
            const req = await fetch(`http://localhost:3000/api/gra?gra=${gameNumber}`)
            const game = await req.json()
            setGameInfo(game.game)
        })();
    }, [gameNumber])

    return (
        <main className='min-h-screen bg-opacity-50 bg-repeat heropattern-hideout-neutral-800'>
            <div className="flex flex-col">
                <div className='h-16 md:h-32'></div>
                <div className="flex flex-col md:flex-row items-start justify-center gap-8 p-8 w-[90%] mx-auto">
                    <div className='flex flex-col justify-center w-full gap-4 text-center sm:basis-1/4'>
                        <div>
                            <div className='flex items-center justify-center gap-4'>
                                <div className='relative w-32 h-32'>
                                    <Image fill src={`/${gameInfo.logo}`} alt="" sizes="100vw" />
                                </div>
                                <p className='text-5xl leading-none whitespace-nowrap'>{gameInfo.name}</p>
                            </div>
                            <p className='p-4 text-justify break-words text-stone-400'>{gameInfo.description}</p>

                            <p className='p-4 text-justify break-words text-stone-400'>{gameInfo.description2}</p>
                        </div>

                        <div className='relative h-64 duration-300 delay-150 z-1 w-full md:w-[480px] hover:scale-110 hover:z-10 hover:drop-shadow-xl'>
                            <Image fill src={`/screeny/${gameInfo.characterImage}`} alt="" sizes="100vw" className='rounded-lg' />
                        </div>
                        <div className='relative h-64 duration-300 delay-150 z-1 w-full md:w-[480px] hover:scale-110 hover:z-10 hover:drop-shadow-xl rounded-lg'>
                            <Image fill src={`/screeny/${gameInfo.characterImage2}`} alt="" sizes="100vw" className='rounded-lg' />
                        </div>
                    </div>

                    <div className='bg-opacity-50 rounded-lg bg-neutral-600 md:basis-3/4'>
                        <div className='w-full'>
                            <ResponsiveEmbed
                                className='rounded-t-lg'
                                src={`https://www.youtube.com/embed/${gameInfo.youtubeLink}`}
                                allowFullScreen
                            />
                        </div>

                        <div className='flex items-center justify-between w-full gap-4 p-4 mx-auto my-8 bg-opacity-50 rounded-lg  md:w-3/4 bg-neutral-500'>
                            <div className='flex flex-col w-full gap-2 lg:gap-12 lg:flex-row'>
                                <label className='basis-1/4'>
                                    <input
                                        value={commentForm.name}
                                        placeholder='Wpisz nazwę...'
                                        onChange={(event) => setCommentForm({ ...commentForm, name: event.target.value })}
                                        className='w-full p-2 text-lg rounded-full text-neutral-800'
                                    />
                                </label>
                                <label className='basis-3/4'>
                                    <input
                                        value={commentForm.comment}
                                        placeholder='Komentarz'
                                        onChange={(event) => setCommentForm({ ...commentForm, comment: event.target.value })}
                                        className='w-full p-2 text-lg rounded-full text-neutral-800'
                                    />
                                </label>
                            </div>
                            <button type="button" onClick={e => sendComment(e)} className='p-2 bg-red-500 rounded-full'>
                                Prześlij
                            </button>
                        </div>

                        {gameInfo.comments &&
                            gameInfo.comments.map((comment) => (
                                <Comment key={comment.id} comment={comment.comment} author={comment.name} />
                            ))}
                    </div>
                </div>
            </div>
        </main>
    )
}