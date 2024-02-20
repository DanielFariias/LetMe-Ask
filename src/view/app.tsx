import { AuthProvider } from '@/app/contexts/auth-context'
import { Router } from '../app/router'

export function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}
