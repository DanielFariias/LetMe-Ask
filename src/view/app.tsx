import { AuthProvider } from '@/app/contexts/auth-context'
import { Router } from '../app/router'
import { Toaster } from 'react-hot-toast'

export function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Router />
    </AuthProvider>
  )
}
