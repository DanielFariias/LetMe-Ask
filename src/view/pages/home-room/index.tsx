import { Button } from '@/view/components/button'
import { Textarea } from '@/view/components/textarea'
import { Link } from 'react-router-dom'
import { useHomeRoomController } from './use-home-room-controller'
import { Navbar } from './components/navbar'
import { QuestionsSection } from './components/question-section'
import { Avatar } from '@/view/components/avatar'
import Loader from '@/view/components/loader'

export function HomeRoom() {
  const { form, roomQuestions, roomTitle, user, isLoading } =
    useHomeRoomController()

  return (
    <>
      <Loader isLoading={isLoading} />
      <Navbar />

      {!isLoading && (
        <main className="px-4 lg:px-0 max-w-[800px] w-full flex flex-col items-center justify-center mx-auto">
          <section className="mt-16 w-full">
            <div className="flex-col sm:flex-row sm:items-start flex gap-4">
              <h1 className="font-bold text-2xl text-center">{roomTitle}</h1>
              <span className="rounded-full bg-[#E559F9] text-white py-2 px-4 text-sm text-center">
                {roomQuestions.length}
                {roomQuestions.length === 1 ? ' Pergunta' : ' Perguntas'}
              </span>
            </div>

            <form className="w-full mt-6" onSubmit={form.handleSubmit}>
              <Textarea
                placeholder="O que você quer perguntar?"
                {...form.register('question')}
                error={form.errors.question?.message}
              />

              <div className="flex justify-between items-center text-gray-600 mt-4 text-sm">
                {!user && (
                  <span className="flex gap-1">
                    Para fazer uma pergunta,
                    <Link to={'/'} className="text-[#835AFD] underline">
                      faça seu login.
                    </Link>
                  </span>
                )}

                <div>
                  {user && <Avatar imageUrl={user.avatar} name={user.name} />}
                </div>

                <div>
                  <Button>Enviar pergunta</Button>
                </div>
              </div>
            </form>
          </section>

          <QuestionsSection />
        </main>
      )}
    </>
  )
}
