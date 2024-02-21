import { Outlet } from 'react-router-dom'

import illustrationSvg from '@/app/assets/illustration.svg'
import logoSvg from '@/app/assets/logo.svg'

export function LoginLayout() {
  return (
    <main className="flex w-full h-full">
      <section className="w-5/12 bg-[#835afd] hidden lg:flex items-start justify-center flex-col px-[80px] text-white gap-4">
        <img
          src={illustrationSvg}
          alt="Ilustração simbolizando perguntas e respostas"
          className="max-w-[240px] xl:max-w-[320px]"
        />

        <div className="max-w-[440px] space-y-4">
          <strong className="font-bold text-2xl xl:text-4xl">
            Toda pergunta tem uma resposta.
          </strong>
          <p className="text-lg xl:text-2xl font-thin text-[#F8F8F8]">
            Aprenda e compartilhe conhecimento com outras pessoas
          </p>
        </div>
      </section>

      <section className="w-full p-4 lg:p-0 lg:w-7/12 flex justify-center items-center flex-col gap-14 ">
        <img src={logoSvg} alt="LetMe-ask" />

        <div className="max-w-[360px] w-full">
          <Outlet />
        </div>
      </section>
    </main>
  )
}
