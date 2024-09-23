import { AuthProvider } from '@/app/contexts/auth-context'
import { Router } from '../app/router'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  console.log('oi')
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  )
}
