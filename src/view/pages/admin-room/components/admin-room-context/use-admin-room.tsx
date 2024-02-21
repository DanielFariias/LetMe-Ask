import { useContext } from 'react'
import { AdminRoomContext } from '.'

export function UseAdminRoom() {
  const context = useContext(AdminRoomContext)

  return context
}
