import { ClipboardButton } from '@/view/components/clipboard-button'

import logoSvg from '@/app/assets/logo.svg'

import { useHomeRoomController } from '../use-home-room-controller'

export function Navbar() {
  const { id } = useHomeRoomController()

  return (
    <header className="border-b shadow-md">
      <div className="max-w-[1120px] flex justify-between items-center w-full p-5 mx-auto">
        <img src={logoSvg} alt="LetMe-ask" className="w-24" />

        <div className="flex">
          <ClipboardButton roomId={id} />
        </div>
      </div>
    </header>
  )
}
