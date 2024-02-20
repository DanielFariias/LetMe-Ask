import { Button } from '@/view/components/button'
import { Input } from '@/view/components/input'
import { Link } from 'react-router-dom'

export function NewRoom() {
  return (
    <>
      <h2 className="font-bold text-2xl text-center">Criar uma sala nova</h2>

      <form className="mt-6 space-y-4">
        <Input name="room-name" placeholder="Nome da sala" />

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
