import { ClipboardButton } from '@/view/components/clipboard-button'

import logoSvg from '@/app/assets/logo.svg'
import { Button } from '@/view/components/button'
import { UseAdminRoom } from './admin-room-context/use-admin-room'

export function Navbar() {
  const { id, handleOpenCloseRoomModal } = UseAdminRoom()

  return (
    <header className="border-b shadow-md">
      <div className="max-w-[1120px] flex justify-between items-center w-full p-5 mx-auto">
        <img src={logoSvg} alt="LetMe-ask" className="w-24" />

        <div className="flex gap-4">
          <ClipboardButton roomId={id} />
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenCloseRoomModal}
          >
            Encerrar sala
          </Button>
        </div>
      </div>
    </header>
  )
}
