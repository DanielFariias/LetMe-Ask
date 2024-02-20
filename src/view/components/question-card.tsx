import { cn } from '@/app/utils/cn'
import { Avatar } from './avatar'
import { IQuestion } from '@/app/types/question'

export function QuestionCard({
  question,
  actions,
}: {
  question: IQuestion
  actions: React.ReactNode
}) {
  const { isAnswered, isHighlighted, author, content, id } = question

  return (
    <article
      key={id}
      className={cn(
        'bg-white p-6 border border-gray-200 rounded-lg text-sm text-gray-600',
        isHighlighted && !isAnswered && 'bg-[#F4F0FF] border-[#835AFD]',
        isAnswered && 'bg-[#DBDCDD]',
      )}
    >
      {isAnswered && (
        <span className="text-[#835AFD] font-semibold mb-2 block">
          Respondida
        </span>
      )}
      <p className={isAnswered ? 'line-through opacity-60' : ''}>{content}</p>

      <div className="flex justify-between mt-6 gap-4">
        <Avatar imageUrl={author.avatar} name={author.name} />

        {actions}
      </div>
    </article>
  )
}
