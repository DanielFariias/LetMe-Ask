import { useHomeRoomController } from '../use-home-room-controller'
import { ThumbsUp } from '@phosphor-icons/react'
import { IconButton } from '@/view/components/icon-button'
import { QuestionCard } from '@/view/components/question-card'
import withoutQuestionsSvg from '@/app/assets/without-questions.svg'

export function QuestionsSection() {
  const { roomQuestions, handleLikeQuestion } = useHomeRoomController()

  return (
    <section className="mt-8 space-y-4 mb-10 w-full">
      {roomQuestions.length < 1 && (
        <div className="flex flex-col items-center justify-center gap-4 w-[320px] mx-auto text-center">
          <img src={withoutQuestionsSvg} alt="Sem perguntas" />

          <h2 className="text-xl font-semibold text-gray-800">
            Nenhuma pergunta por aqui...
          </h2>
          <p className="text-gray-500 text-sm">
            Faça o seu login e seja a primeira pessoa a fazer uma pergunta!
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
                active={!!question.likeId}
                onClick={() => handleLikeQuestion(question.id, question.likeId)}
                icon={<ThumbsUp size={24} />}
              >
                {question.likeCount}
              </IconButton>
            </>
          }
        />
      ))}
    </section>
  )
}
