import { useHomeRoomController } from '../use-home-room-controller'
import { ThumbsUp } from '@phosphor-icons/react'
import { useParams } from 'react-router-dom'
import { IconButton } from '@/view/components/icon-button'
import { QuestionCard } from '@/view/components/question-card'

export function QuestionsSection() {
  const params = useParams()
  const id = params.id as string

  const { roomQuestions, handleLikeQuestion } = useHomeRoomController({ id })

  return (
    <section className="mt-8 space-y-4 mb-10">
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
