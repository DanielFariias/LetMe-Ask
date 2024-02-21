import { ChatText, CheckCircle, Trash } from '@phosphor-icons/react'
import { IconButton } from '@/view/components/icon-button'
import { QuestionCard } from '@/view/components/question-card'
import { UseAdminRoom } from './admin-room-context/use-admin-room'
import withoutQuestionsSvg from '@/app/assets/without-questions.svg'

export function QuestionsSection() {
  const {
    roomQuestions,
    handleCheckQuestionAsAnswered,
    handleHighlightQuestion,
    handleSelectQuestionId,
  } = UseAdminRoom()

  return (
    <section className="mt-8 space-y-4 mb-10 w-full">
      {roomQuestions.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 w-[320px] mx-auto text-center mt-32">
          <img src={withoutQuestionsSvg} alt="Sem perguntas" />

          <h2 className="text-xl font-semibold text-gray-800">
            Nenhuma pergunta por aqui...
          </h2>
          <p className="text-gray-500 text-sm">
            Envie o código desta sala para seus amigos e comece a responder
            perguntas!
          </p>
        </div>
      )}
      {roomQuestions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          actions={
            <>
              <IconButton
                active={question.isAnswered}
                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                icon={<CheckCircle size={24} />}
              />
              <IconButton
                active={question.isHighlighted && !question.isAnswered}
                onClick={() => handleHighlightQuestion(question.id)}
                icon={<ChatText size={24} />}
                disabled={question.isAnswered}
              />
              <IconButton
                onClick={() => handleSelectQuestionId(question.id)}
                icon={<Trash size={24} />}
                disabled={question.isAnswered}
              />
            </>
          }
        />
      ))}
    </section>
  )
}
