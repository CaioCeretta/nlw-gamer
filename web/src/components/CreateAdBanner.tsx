import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog'


export function CreateAddBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-16 ">
      <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
        <div>
          <strong className='text-2xl text-white font-black block'>Didn't find your duo?</strong>
          <span className='text-zinc-400 block'>Post an ad to find new players</span>
        </div>
        <Dialog.Trigger className="py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-3">
          <MagnifyingGlassPlus size="24" />
          Post Ad
        </Dialog.Trigger>
      </div>
    </div>
  )
}
