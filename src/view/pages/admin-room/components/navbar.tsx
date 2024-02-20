import { ClipboardButton } from '@/view/components/clipboard-button'

import logoSvg from '@/app/assets/logo.svg'
import { useParams } from 'react-router-dom'
import { Button } from '@/view/components/button'
import { useAdminRoomController } from '../use-admin-room-controller'

export function Navbar() {
  const params = useParams()
  const id = params.id as string

  const { handleCloseRoom } = useAdminRoomController({ id })

  return (
    <header className="border-b shadow-md">
      <div className="max-w-[1120px] flex justify-between items-center w-full p-5 mx-auto">
        <img src={logoSvg} alt="LetMe-ask" className="w-24" />

        <div className="flex gap-4">
          <ClipboardButton roomId={id} />
          <Button variant="outline" size="sm" onClick={handleCloseRoom}>
            Encerrar sala
          </Button>
        </div>
      </div>
    </header>
  )
}
