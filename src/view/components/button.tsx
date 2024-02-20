import { cn } from '@/app/utils/cn'
import { ComponentProps } from 'react'

const variants = {
  primary: 'bg-[#835AFD] hover:bg-[#6F4BD8]',
  secondary: 'text-[#737380] bg-[#DBDCDD] hover:bg-[#CECECE]',
  danger: 'bg-[#E73F5D] hover:bg-[#D73754]',
  outline:
    'bg-transparent border border-[#835AFD] text-[#835AFD] hover:bg-[#835AFD] hover:text-white',
}

const sizes = {
  md: 'p-3',
  sm: 'py-2 px-4 text-sm',
}

interface TButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'danger' | 'outline' | 'secondary'
  size?: 'md' | 'sm'
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: TButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'w-full p-3 rounded-lg text-white font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </button>
  )
}
