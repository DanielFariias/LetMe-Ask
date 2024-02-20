import { cn } from '@/app/utils/cn'
import { Copy } from '@phosphor-icons/react'
import { ComponentProps } from 'react'

interface TButtonProps extends ComponentProps<'button'> {
  roomId: string
}

export function ClipboardButton({ roomId, className, ...props }: TButtonProps) {
  function handleCopyRoomCode() {
    navigator.clipboard.writeText(roomId)
  }

  return (
    <button
      {...props}
      className={cn(
        'flex items-center w-full rounded-lg font-medium transition-colors  bg-transparent border border-[#835AFD] text-[#835AFD] hover:bg-[#835AFD] hover:text-white disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500',
        className,
      )}
      onClick={handleCopyRoomCode}
    >
      <div className="bg-[#835AFD] py-1.5 px-4 text-white rounded-s-md">
        <Copy size={24} />
      </div>
      <span className="w-full overflow-visible text-center text-sm text-nowrap px-4">
        Sala {roomId}
      </span>
    </button>
  )
}
