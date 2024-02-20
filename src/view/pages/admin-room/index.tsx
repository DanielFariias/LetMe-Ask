import { useParams } from 'react-router-dom'
import { Navbar } from './components/navbar'
import { QuestionsSection } from './components/question-section'
import { useAdminRoomController } from './use-admin-room-controller'

export function AdminRoom() {
  const params = useParams()
  const id = params.id as string

  const { roomQuestions, roomTitle } = useAdminRoomController({ id })

  return (
    <>
      <Navbar />
      <main className="max-w-[800px] w-full flex flex-col items-center justify-center mx-auto">
        <section className="mt-16 w-full">
          <div className="flex gap-4">
            <h1 className="font-bold text-2xl">{roomTitle}</h1>
            <span className="rounded-full bg-[#E559F9] text-white py-2 px-4 text-sm">
              {roomQuestions.length}
              {roomQuestions.length === 1 ? ' Pergunta' : ' Perguntas'}
            </span>
          </div>
        </section>

        <QuestionsSection />
      </main>
    </>
  )
}
