import { useAuth } from '@/app/hooks/use-auth'
import { firebase } from '@/app/services/firebase'
import { zodResolver } from '@hookform/resolvers/zod'
import { push, ref } from 'firebase/database'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
  roomName: z.string().min(1, 'ID da sala é obrigatório.'),
  password: z.string().min(1, 'Senha é obrigatória.'),
})

type TFormSchema = z.infer<typeof formSchema>

export function UseNewRoomController() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid },
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
  })

  const handleSubmit = hookFormSubmit(async ({ roomName, password }) => {
    // TODO: Converter a senha para hash
    const roomsRef = ref(firebase.db, `rooms`)

    const newRoomRef = await push(roomsRef, {
      authorId: user?.id,
      title: roomName,
      password,
    })

    navigate(`/room/${newRoomRef.key}`)
  })

  return {
    form: {
      register,
      handleSubmit,
      errors,
      isValid,
    },
  }
}
