import { Button } from '@/view/components/button'
import Modal from '@/view/components/modal'
import { TrashSimple } from '@phosphor-icons/react'
import { UseAdminRoom } from './admin-room-context/use-admin-room'
import toast from 'react-hot-toast'

export function DeleteQuestionModal() {
  const {
    handleDeleteQuestion,
    selectedQuestionId,
    handleClearSelectedQuestionId,
  } = UseAdminRoom()

  return (
    <Modal open={!!selectedQuestionId} onClose={handleClearSelectedQuestionId}>
      <div className="flex flex-col justify-center items-center  text-gray-700">
        <TrashSimple className="text-[#E73F5D]" size={64} weight="bold" />

        <h2 className="mt-6 text-2xl font-bold">Excluir pergunta?</h2>

        <p className="text-gray-500 mt-3">
          Tem certeza que você deseja excluir esta pergunta?
        </p>

        <div className="mt-10 flex gap-4 w-full">
          <Button variant="secondary" onClick={handleClearSelectedQuestionId}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (!selectedQuestionId)
                return toast.error('Nenhum id selecionado')

              handleDeleteQuestion(selectedQuestionId)
            }}
          >
            Sim, excluir
          </Button>
        </div>
      </div>
    </Modal>
  )
}
