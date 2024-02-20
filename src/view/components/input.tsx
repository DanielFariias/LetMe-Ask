import { ComponentProps, forwardRef } from 'react'
import { cn } from '../../app/utils/cn'
import { XCircle } from '@phosphor-icons/react'

interface InputProps extends ComponentProps<'input'> {
  name: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, placeholder, error, className, ...props }: InputProps, ref) => {
    const inputId = id ?? name

    return (
      <div className="relative">
        <input
          ref={ref}
          {...props}
          id={inputId}
          name={name}
          className={cn(
            'bg-white w-full rounded-lg border placeholder-shown:pt-0 pt-4 border-gray-400 px-3 h-[48px] text-gray-800 focus:border-[#835AFD] outline-none transition-all peer',
            error && 'border-red-500 focus:border-red-500',
            className,
          )}
          placeholder=" "
        />
        <label
          htmlFor={name}
          className={cn(
            'absolute text-xs top-1.5 left-[13px] pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-[11px] transition-all',
            error && 'text-red-500',
          )}
        >
          {placeholder}
        </label>

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

Input.displayName = 'Input'
