import { Button } from '@/view/components/button'
import Modal from '@/view/components/modal'
import { XCircle } from '@phosphor-icons/react'
import { UseAdminRoom } from './admin-room-context/use-admin-room'

export function CloseRoomModal() {
  const { handleCloseRoom, isCloseRoomModalOpen, handleCloseCloseRoomModal } =
    UseAdminRoom()

  return (
    <Modal open={isCloseRoomModalOpen} onClose={handleCloseCloseRoomModal}>
      <div className="flex flex-col justify-center items-center  text-gray-700">
        <XCircle className="text-[#E73F5D]" size={64} weight="bold" />

        <h2 className="mt-6 text-2xl font-bold">Encerrar Sala?</h2>

        <p className="text-gray-500 mt-3">
          Tem certeza que você deseja encerrar esta sala?
        </p>

        <div className="mt-10 flex gap-4 w-full">
          <Button variant="secondary" onClick={handleCloseCloseRoomModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleCloseRoom}>
            Sim, encerrar
          </Button>
        </div>
      </div>
    </Modal>
  )
}
