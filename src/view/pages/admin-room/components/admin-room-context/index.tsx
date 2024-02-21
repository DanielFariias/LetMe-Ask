import { useAuth } from '@/app/hooks/use-auth'
import { firebase } from '@/app/services/firebase'
import { IQuestion } from '@/app/types/question'
import { onValue, ref, remove, update } from 'firebase/database'
import { createContext, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

interface IAdminRoomContext {
  roomTitle: string
  roomQuestions: IQuestion[]
  handleCheckQuestionAsAnswered: (questionId: string) => void
  handleCloseRoom: () => void
  user: ReturnType<typeof useAuth>['user']
  handleHighlightQuestion: (questionId: string) => void
  handleDeleteQuestion: (questionId: string) => void
  selectedQuestionId: string | null
  handleSelectQuestionId: (questionId: string) => void
  id: string
  handleClearSelectedQuestionId: () => void
  isCloseRoomModalOpen: boolean
  handleOpenCloseRoomModal: () => void
  handleCloseCloseRoomModal: () => void
  isLoading: boolean
}

export const AdminRoomContext = createContext({} as IAdminRoomContext)

interface IDatabaseQuestion {
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likes: Record<
    string,
    {
      authorId: string
    }
  >
}

type TFirebaseQuestions = Record<string, IDatabaseQuestion>

export function AdminRoomProvider({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const id = params.id as string

  const { user } = useAuth()
  const navigate = useNavigate()

  const [roomTitle, setRoomTitle] = useState('')
  const [roomQuestions, setRoomQuestions] = useState<IQuestion[]>([])

  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null,
  )
  const [isCloseRoomModalOpen, setIsCloseRoomModalOpen] = useState(false)

  const handleOpenCloseRoomModal = useCallback(() => {
    setIsCloseRoomModalOpen(true)
  }, [])

  const handleCloseCloseRoomModal = useCallback(() => {
    setIsCloseRoomModalOpen(false)
  }, [])

  const handleSelectQuestionId = useCallback((questionId: string) => {
    console.log(questionId)
    setSelectedQuestionId(questionId)
  }, [])

  const handleClearSelectedQuestionId = useCallback(() => {
    setSelectedQuestionId(null)
  }, [])

  const handleCheckQuestionAsAnswered = useCallback(
    (questionId: string) => {
      const roomRef = ref(firebase.db, `rooms/${id}/questions/${questionId}`)

      let question = {} as IDatabaseQuestion

      onValue(roomRef, (snapshot) => {
        question = snapshot.val()
      })

      if (question.isAnswered) {
        return update(roomRef, { isAnswered: false })
      }

      return update(roomRef, { isAnswered: true })
    },
    [id],
  )

  const handleHighlightQuestion = useCallback(
    (questionId: string) => {
      const roomRef = ref(firebase.db, `rooms/${id}/questions/${questionId}`)

      let question = {} as IDatabaseQuestion

      onValue(roomRef, (snapshot) => {
        question = snapshot.val()
      })

      if (question.isHighlighted) {
        return update(roomRef, { isHighlighted: false })
      }

      return update(roomRef, { isHighlighted: true })
    },
    [id],
  )

  const handleDeleteQuestion = useCallback(
    async (questionId: string) => {
      const roomRef = ref(firebase.db, `rooms/${id}/questions/${questionId}`)
      await remove(roomRef)
      handleClearSelectedQuestionId()
    },
    [handleClearSelectedQuestionId, id],
  )

  const handleCloseRoom = useCallback(async () => {
    const roomRef = ref(firebase.db, `rooms/${id}`)

    await update(roomRef, { endedAt: new Date() })

    toast.success('Sala encerrada com sucesso')
    return navigate('/')
  }, [id, navigate])

  useEffect(() => {
    const roomRef = ref(firebase.db, `rooms/${id}`)

    onValue(roomRef, (snapshot) => {
      const room = snapshot.val()

      if (room.authorId !== user?.id) {
        toast.error('Você não tem permissão para acessar essa sala.')

        navigate(`/room/${id}`)
      }

      const questions = (room.questions ?? {}) as TFirebaseQuestions
      const parsedQuestions = Object.entries(questions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(
            ([, like]) => like.authorId === user?.id,
          )?.[0],
        }
      })

      setRoomTitle(room.title)
      setRoomQuestions(parsedQuestions)
    })
  }, [id, user?.id])

  return (
    <AdminRoomContext.Provider
      value={{
        roomTitle,
        roomQuestions,
        handleCheckQuestionAsAnswered,
        handleCloseRoom,
        user,
        handleHighlightQuestion,
        handleDeleteQuestion,
        selectedQuestionId,
        handleSelectQuestionId,
        id,
        handleClearSelectedQuestionId,
        isCloseRoomModalOpen,
        handleOpenCloseRoomModal,
        handleCloseCloseRoomModal,
        isLoading: !roomTitle,
      }}
    >
      {children}
    </AdminRoomContext.Provider>
  )
}
