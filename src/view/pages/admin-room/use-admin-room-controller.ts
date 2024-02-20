import { useAuth } from '@/app/hooks/use-auth'
import { firebase } from '@/app/services/firebase'
import { IQuestion } from '@/app/types/question'
import { onValue, ref, remove, update } from 'firebase/database'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

interface IHomeRoomControllerProps {
  id: string
}

export function useAdminRoomController({ id }: IHomeRoomControllerProps) {
  const [roomTitle, setRoomTitle] = useState('')
  const [roomQuestions, setRoomQuestions] = useState<IQuestion[]>([])

  const { user } = useAuth()
  const navigate = useNavigate()

  const handleDeleteQuestion = useCallback(
    (questionId: string) => {
      const roomRef = ref(firebase.db, `rooms/${id}/questions/${questionId}`)
      remove(roomRef)
    },
    [id],
  )

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

  const handleCloseRoom = useCallback(async () => {
    const roomRef = ref(firebase.db, `rooms/${id}`)

    await update(roomRef, { endedAt: new Date() })
    return navigate('/')
  }, [id])

  useEffect(() => {
    const roomRef = ref(firebase.db, `rooms/${id}`)
    onValue(roomRef, (snapshot) => {
      const room = snapshot.val()
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

  return {
    roomTitle,
    roomQuestions,
    user,
    handleCheckQuestionAsAnswered,
    handleDeleteQuestion,
    handleHighlightQuestion,
    handleCloseRoom,
  }
}
