import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '../../app/utils/cn'

interface IModalProps {
  open: boolean
  children: React.ReactNode
  onClose?(): void
}

export default function Modal({ open, onClose, children }: IModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 bg-black/80 backdrop-blur-sm z-50',
            'data-[state=open]:animate-overlay-show',
          )}
        />

        <Dialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-16 bg-white rounded-lg z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[600px] outline-none',
            'data-[state=open]:animate-content-show',
          )}
        >
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
