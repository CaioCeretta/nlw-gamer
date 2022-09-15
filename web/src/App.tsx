//JSX= Javascript + XML (HTML)

/**  Todas essas funções do react que iniciam com 'use' são chamadas de hooks
 * Essas funções nada mais são funções que acoplam algum tipo de comportamento dentro
 * de um componente */

import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { GameBanner } from './components/GameBanner';


import './styles/main.css';

import { GameController, MagnifyingGlassPlus } from 'phosphor-react';
import logoImg from './assets/Logo-nlwesports.svg';
import { CreateAddBanner } from './components/CreateAdBanner';
import { Input } from './components/Form/Input';

interface Game {
  ''
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number;
  }
}

function App() {
  // Tudo que vai exibir algo em tela de acordo com o valor de uma variável nós colocamos em um estado
  const [games, setGames] = useState<Game[]>([]);


  /**
 * Use effect vem de efeito colateral, algo que acontece derivado de alguma ação que usúario fez.
 * O useEffect precisa de 2 parametros, o primeiro é para você informar o efeito colateral,
 * ou seja qual função executar e o segundo que é o array indica quando queremos executar essa
 * função. Esse quando é geralmente a alteração das variáveis passadas no array.
 *
 * Quando não colocamos nenhuma variável nesse array de dependencias, o efeito colateral será executado
 * uma única vez durante todo o fluxo do nosso componente. Não importa quantas vezes o estado mudar.
 */

  useEffect(() => {
    fetch('http://localhost:3001/games')
      .then(response => response.json())
      .then(data => {
        setGames(data);
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col my-20 items-center">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Your <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> is here
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}


      </div>
      <Dialog.Root>
        <CreateAddBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className='text-3xl text-white font-black'>Post an Add</Dialog.Title>

            <form action="" className='mt-8 flex flex-col gap-4'>
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Game Name</label>
                <Input
                  id="form-game"
                  placeholder="Select the game that you wish to play" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="form-name">Your name (or nickame)</label>
                <Input id="form-name" type="text" placeholder="How they call you" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-yearsPlaying">How long do you play?</label>
                  <Input id="form-years-playing" type="number" placeholder="It's ok if you just started playing" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-discord">Discord</label>
                  <Input id="form-discord" type="text" placeholder="User#0000" />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-weekDays">When do you usually play</label>
                  <div className='grid grid-cols-4 gap-2'>
                    <button
                      title="Sunday"
                      className="w-7 h-7 rounded bg-zinc-900">
                      S
                    </button>
                    <button
                      title="Monday"
                      className="w-7 h-7 rounded bg-zinc-900">

                      M
                    </button>
                    <button
                      title="Tuesday"
                      className="w-7 h-7 rounded bg-zinc-900">
                      T
                    </button>
                    <button
                      title="Wednesday"
                      className="w-7 h-7 rounded bg-zinc-900">
                      W
                    </button>
                    <button
                      title="Thursday"
                      className="w-7 h-7 rounded bg-zinc-900">
                      T</button>
                    <button
                      title="Friday"
                      className="w-7 h-7 rounded bg-zinc-900">
                      F
                    </button>
                    <button
                      title="Saturday"
                      className="w-7 h-7 rounded bg-zinc-900"
                    >S</button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">At what time of the day?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="time" id="hourStart" placeholder='From' />
                    <Input type="time" id="hourEnd" placeholder='To' />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <Input type="checkbox" />
                I'm used to connect on voice chat
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close className="bg-zinc-500 hover:bg-zinc-600  px-5 h-12 round-md font-semibold">Dismiss</Dialog.Close>
                <button className="flex gap-3 items-center bg-violet-500 hover:bg-violet-600 px-5 h-12 round-md font-semibold" type="submit">
                  <GameController size={24}/>
                  Find Duo
                </button>
              </footer>

            </form >


          </Dialog.Content >
        </Dialog.Portal >
      </Dialog.Root >
    </div >

  )
}

export default App
