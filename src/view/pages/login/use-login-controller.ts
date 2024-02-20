import { useAuth } from '@/app/hooks/use-auth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { firebase } from '@/app/services/firebase'
import { onValue, ref } from 'firebase/database'

const formSchema = z.object({
  roomId: z.string().min(1, 'ID da sala é obrigatório.').trim(),
})

type TFormSchema = z.infer<typeof formSchema>

export function UseLoginController() {
  const { signInWithGoogle, user } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid },
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
  })

  async function handleCreateRoomWithGoogle() {
    if (!user) {
      await signInWithGoogle()
    }
    navigate('/room/new')
  }

  const handleSubmit = hookFormSubmit(async ({ roomId }) => {
    const roomRef = ref(firebase.db, `rooms/${roomId}`)
    onValue(roomRef, (snapshot) => {
      const room = snapshot.val()

      if (!room) {
        // TODO: Use Toast instead of alert
        return alert('Room does not exist.')
      }

      if (room?.endedAt) {
        // TODO: Use Toast instead of alert
        return alert('Room already closed')
      }

      navigate(`/room/${roomId}`)
    })
  })
  return {
    handleCreateRoomWithGoogle,
    form: {
      register,
      handleSubmit,
      errors,
      isValid,
    },
  }
}
