import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';

import { Check, GameController } from 'phosphor-react';
import { Input } from './Form/Input';
import { FormEvent, useEffect, useState } from 'react';


interface Game {
  id: string,
  title: string,
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios('http://localhost:3001/games')
      .then(response => {
        setGames(response.data)
      });

  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)

    const data = Object.fromEntries(formData);


    try {
      await axios.post(`http://localhost:3001/games/${data.form_game}/ads`, {
        name: data.form_name,
        yearsPlaying: Number(data.form_yearsPlaying),
        discord: data.form_discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })

      alert('Ad successfully published')

    } catch(err) {
      alert(err);
      alert('Error while publishing the ad!');
    }

  }


  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className='text-3xl text-white font-black'>Post an Add</Dialog.Title>

        <form onSubmit={handleCreateAd} action="" className='mt-8 flex flex-col gap-4'>
          <div className="flex flex-col gap-2">
            <label htmlFor="form_game" className="font-semibold">For which game?</label>
            <select id="form_game" name="form_game"
              className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
              defaultValue="">

              <option disabled value="">Select the game that you wish to play</option>
              {games.map(game => <option key={game.id} value={game.id}>{game.title}</option>)}
            </select>

          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="form_name">Your name (or nickame)</label>
            <Input id="form_name" name="form_name" type="text" placeholder="How they call you" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="form_yearsPlaying">How long do you play?</label>
              <Input id="form-years-playing" name="form_yearsPlaying" type="number" placeholder="It's ok if you just started playing" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="form_discord">Discord</label>
              <Input id="form_discord" name="form_discord" type="text" placeholder="User#0000" />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="form_weekDays">When do you usually play</label>
              <div>
                <ToggleGroup.Root
                  type="multiple"
                  className='grid grid-cols-4 gap-2'
                  value={weekDays}
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    title="Sunday"
                    className={`w-7 h-7 rounded
                    ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    title="Monday"
                    className={`w-7 h-7 rounded
                    ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                    M
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    title="Tuesday"
                    className={`w-7 h-7 rounded
                    ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    title="Wednesday"
                    className={`w-7 h-7 rounded
                    ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>

                    W
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    title="Thursday"
                    className={`w-7 h-7 rounded
                    ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                    T</ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    title="Friday"
                    className={`w-7 h-7 rounded
                    ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                    F
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    title="Saturday"
                    className={`w-7 h-7 rounded
                    ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                    S</ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">At what time of the day?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" name="hourStart" id="hourStart" placeholder="From" />
                <Input type="time" name="hourEnd" id="hourEnd" placeholder="To" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
              className='w-6 h-6 p-1 rounded bg-zinc-900'>
              <Checkbox.Indicator>
                <Check className='h-4 w-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            I'm used to connect on voice chat

          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 hover:bg-zinc-600  px-5 h-12 round-md font-semibold">Dismiss</Dialog.Close>
            <button className="flex gap-3 items-center bg-violet-500 hover:bg-violet-600 px-5 h-12 round-md font-semibold" type="submit">
              <GameController size={24} />
              Find Duo
            </button>
          </footer>

        </form >


      </Dialog.Content >
    </Dialog.Portal >
  )
}
