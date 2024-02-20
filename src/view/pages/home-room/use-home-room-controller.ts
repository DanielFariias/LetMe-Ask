import { useAuth } from '@/app/hooks/use-auth'
import { firebase } from '@/app/services/firebase'
import { IQuestion } from '@/app/types/question'
import { zodResolver } from '@hookform/resolvers/zod'
import { onValue, push, ref, remove } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const formSchema = z.object({
  question: z.string().min(1, 'Question is required.'),
})

type TFormSchema = z.infer<typeof formSchema>

export function useHomeRoomController({ id }: IHomeRoomControllerProps) {
  const [roomTitle, setRoomTitle] = useState('')
  const [roomQuestions, setRoomQuestions] = useState<IQuestion[]>([])

  const { user } = useAuth()

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
  })

  const handleSubmit = hookFormSubmit(async ({ question }) => {
    reset()

    if (!user) throw new Error('You must be logged in')

    const newQuestion = {
      content: question,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    const roomRef = ref(firebase.db, `rooms/${id}/questions`)
    await push(roomRef, newQuestion)
  })

  function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    if (likeId) {
      const roomRef = ref(
        firebase.db,
        `rooms/${id}/questions/${questionId}/likes/${likeId}`,
      )
      return remove(roomRef)
    }
    const roomRef = ref(
      firebase.db,
      `rooms/${id}/questions/${questionId}/likes`,
    )
    return push(roomRef, {
      authorId: user?.id,
    })
  }

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
    form: {
      register,
      handleSubmit,
      errors,
      isValid,
    },
    user,
    handleLikeQuestion,
  }
}
