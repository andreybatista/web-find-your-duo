
import { useState, useEffect } from 'react'
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog'

import GamerBanner from './components/GameBanner'
import CreateAdBanner from './components/CreateAdBanner'

import './styles/main.css';

import logoimg from './assets/logo-esports.svg';
import CreateAdModal from './components/CreateAdModal';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    // axios('http://localhost:8080/games').then(response => {
    //   setGames(response.data)
    // })
    setGames([
      {
        "id": "a8827c79-5a73-4743-aa3b-ccd5fa204d50",
        "title": "League of Legends",
        "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg",
        "_count": {
          "ads": 1
        }
      },
      {
        "id": "50dcfc4e-14d1-4549-abe9-c9aeca61ba5d",
        "title": "Counter-Strike: Global Offensive",
        "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-285x380.jpg",
        "_count": {
          "ads": 3
        }
      },
      {
        "id": "d455284a-c460-4ead-908c-2c3934eb4c86",
        "title": "VALORANT",
        "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg",
        "_count": {
          "ads": 0
        }
      },
      {
        "id": "2f9dc062-fe72-49dd-99e7-bebbdec2b15d",
        "title": "Fall Guys",
        "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/512980-285x380.jpg",
        "_count": {
          "ads": 0
        }
      },
      {
        "id": "fffa483d-1142-47da-8f35-31b5303aff97",
        "title": "FIFA 23",
        "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/1745202732_IGDB-285x380.jpg",
        "_count": {
          "ads": 0
        }
      },
      {
        "id": "7499ecf5-0539-4321-ad26-1cca166f2ee1",
        "title": "The Last of Us Part I",
        "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/294724507_IGDB-285x380.jpg",
        "_count": {
          "ads": 0
        }
      }
    ])
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoimg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>


      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map((game) => {
          return (
            <GamerBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}

      </div>
      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal setGamesHome={setGames} gamesHome={games} />
      </Dialog.Root>
    </div>
  )
}

export default App
