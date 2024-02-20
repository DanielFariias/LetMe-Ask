import { ComponentProps, forwardRef } from 'react'
import { cn } from '../../app/utils/cn'
import { XCircle } from '@phosphor-icons/react'

interface ITextareaProps extends ComponentProps<'textarea'> {
  name: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ id, name, error, className, ...props }: ITextareaProps, ref) => {
    const textareaId = id ?? name

    return (
      <div className="relative">
        <textarea
          ref={ref}
          {...props}
          id={textareaId}
          name={name}
          className={cn(
            'bg-white w-full min-h-[140px] rounded-lg border placeholder-shown:pt-[11px] py-3 px-5 border-gray-200 text-gray-800 focus:border-[#835AFD] outline-none transition-colors peer',
            error && 'border-red-500 focus:border-red-500',
            className,
          )}
        />
        {error && (
          <div className="flex gap-1 items-center mt-2 text-red-500">
            <XCircle />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
