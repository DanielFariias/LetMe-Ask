import { useContext } from 'react'
import { AuthContext } from '../contexts/auth-context'

export function useAuth() {
  const content = useContext(AuthContext)

  return content
}
