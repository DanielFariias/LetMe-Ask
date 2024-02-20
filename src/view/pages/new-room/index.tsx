import { Button } from '@/view/components/button'
import { Input } from '@/view/components/input'
import { Link } from 'react-router-dom'
import { UseNewRoomController } from './use-new-room-controller'

export function NewRoom() {
  const { form } = UseNewRoomController()

  return (
    <>
      <h2 className="font-bold text-2xl text-center text-gray-700">
        Criar uma sala nova
      </h2>

      <form className="mt-8 space-y-4" onSubmit={form.handleSubmit}>
        <Input
          placeholder="Nome da sala"
          {...form.register('roomName')}
          error={form.errors.roomName?.message}
        />
        <Input
          placeholder="Senha"
          {...form.register('password')}
          type="password"
          error={form.errors.password?.message}
        />

        <Button>Criar sala</Button>
      </form>

      <span className="text-sm text-[#737380] mt-2 flex gap-1 justify-center">
        Quer entrar em uma sala que já existe?
        <Link to={'/'} className="text-[#E559F9] underline">
          Clique aqui
        </Link>
      </span>
    </>
  )
}
