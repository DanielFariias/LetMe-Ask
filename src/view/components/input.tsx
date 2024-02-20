import { ComponentProps, forwardRef } from 'react'
import { cn } from '../../app/utils/cn'

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
            'bg-white w-full rounded-lg border placeholder-shown:pt-0 pt-4 border-gray-400 px-3 h-[48px] text-gray-800 focus:border-gray-800 outline-none transition-all peer',
            error && 'border-red-900 focus:border-red-900',
            className,
          )}
          placeholder=" "
        />
        <label
          htmlFor={name}
          className="absolute text-xs top-1.5 left-[13px] pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-[11px] transition-all"
        >
          {placeholder}
        </label>

        {error && (
          <div className="flex gap-2 items-center mt-2 text-red-900">
            {/* <CrossCircledIcon /> */}
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
