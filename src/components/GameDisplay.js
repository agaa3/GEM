'use client'
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { games } from "@/lib/games"

const GameDisplay = ({ changeBackgroundImage  }) => {
  const [selectedGame, setSelectedGame] = useState(games[0])

  const handleSelection = (game) => {
    setSelectedGame(game)
    changeBackgroundImage(game.image)
  }

  return (
    <div className="relative z-50 p-12 mt-[168px]">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-[96px] sm:text-[110px] font-bold drop-shadow-takibezrozmazania h-[128px] whitespace-nowrap">
          {selectedGame.title}
        </p>
        <p className="text-[32px] font-bold drop-shadow-takibezrozmazaniaalemniejszy">
          Zespół: {selectedGame.team}
        </p>
      </div>
      <div className="grid items-center justify-center w-full grid-cols-2 gap-8 mt-12 md:grid-cols-4">
        {games.map((game) => (
          <Link
            href={`/gra/${game.id}`}
            key={game.id}
            className="flex items-center justify-center cursor-pointer"
            onMouseOver={() => handleSelection(game)}
          >
            <div className="w-36 h-36 lg:w-48 lg:h-48 drop-shadow-2xl hover:drop-shadow-tentego">
              <Image fill src={`/${game.url}`}  alt="" sizes="100vw" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default GameDisplay
