import { Navbar } from './components/navbar'
import { QuestionsSection } from './components/question-section'
import {
  AdminRoomContext,
  AdminRoomProvider,
} from './components/admin-room-context'
import { DeleteQuestionModal } from './components/delete-question-modal'
import { CloseRoomModal } from './components/close-room-modal'
import Loader from '@/view/components/loader'

export function AdminRoom() {
  return (
    <AdminRoomProvider>
      <Navbar />
      <AdminRoomContext.Consumer>
        {({ roomQuestions, roomTitle, isLoading }) => (
          <>
            <Loader isLoading={isLoading} />
            {!isLoading && (
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
            )}
          </>
        )}
      </AdminRoomContext.Consumer>

      <DeleteQuestionModal />
      <CloseRoomModal />
    </AdminRoomProvider>
  )
}
