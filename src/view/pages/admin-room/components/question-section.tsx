import { ChatText, CheckCircle, Trash } from '@phosphor-icons/react'
import { useParams } from 'react-router-dom'
import { useAdminRoomController } from '../use-admin-room-controller'
import { IconButton } from '@/view/components/icon-button'
import { QuestionCard } from '@/view/components/question-card'

export function QuestionsSection() {
  const params = useParams()
  const id = params.id as string

  const {
    roomQuestions,
    handleCheckQuestionAsAnswered,
    handleDeleteQuestion,
    handleHighlightQuestion,
  } = useAdminRoomController({ id })

  return (
    <section className="mt-8 space-y-4 mb-10">
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
                onClick={() => handleDeleteQuestion(question.id)}
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
