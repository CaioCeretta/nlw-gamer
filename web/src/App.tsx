//JSX= Javascript + XML (HTML)

/**  Todas essas funções do react que iniciam com 'use' são chamadas de hooks
 * Essas funções nada mais são funções que acoplam algum tipo de comportamento dentro
 * de um componente */

import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios'

import { GameBanner } from './components/GameBanner';


import './styles/main.css';

import { GameController, MagnifyingGlassPlus } from 'phosphor-react';
import logoImg from './assets/Logo-nlwesports.svg';
import { CreateAddBanner } from './components/CreateAdBanner';
import { Input } from './components/Form/Input';
import { CreateAdModal } from './components/CreateAdModal';

interface Game {
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
    axios('http://localhost:3001/games')
      .then(response => {
        setGames(response.data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col my-20 items-center">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Your <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> is here
      </h1>

      {console.log(games)}
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.Ads}
            />
          )
        })}


      </div>
      <Dialog.Root>
        <CreateAddBanner />

        <CreateAdModal />
      </Dialog.Root >
    </div >

  )
}

export default App
