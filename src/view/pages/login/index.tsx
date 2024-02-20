import { Button } from '@/view/components/button'
import { Input } from '@/view/components/input'
import { GoogleLogo } from '@phosphor-icons/react'

export function Login() {
  return (
    <>
      <Button variant="danger" className="flex gap-4 justify-center">
        <GoogleLogo weight="bold" size={24} />
        Criar sua sala com o google
      </Button>

      <div className="my-[32px] w-full flex items-center before:content-[''] before:h-[1px] before:bg-[#a8a8b3] before:w-2/3  after:content-[''] after:h-[1px] after:bg-[#a8a8b3] after:w-2/3">
        <p className="w-full text-sm text-[#a8a8b3] ml-3">
          ou entre em uma sala
        </p>
      </div>

      <form className="space-y-4">
        <Input name="room-id" placeholder="Código da sala" />

        <Button>Entrar na sala</Button>
      </form>
    </>
  )
}
