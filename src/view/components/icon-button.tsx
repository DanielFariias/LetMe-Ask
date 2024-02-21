import { cn } from '@/app/utils/cn'
import { ComponentProps } from 'react'

interface TButtonProps extends ComponentProps<'button'> {
  icon: React.ReactNode
  children?: React.ReactNode
  active?: boolean
  onClick?: () => void
}

export function IconButton({
  children,
  className,
  active,
  icon,
  onClick,
  ...props
}: TButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'flex items-end gap-2 text-gray-400 hover:text-[#835AFD] transition-colors disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-gray-400',
        active && 'text-[#835AFD]',
        className,
      )}
      onClick={onClick}
    >
      {children}
      {icon}
    </button>
  )
}
