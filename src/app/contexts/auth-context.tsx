import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'

import { firebase } from '../services/firebase'
import toast from 'react-hot-toast'

interface IUser {
  id: string
  name: string
  avatar: string
}

interface IAuthContextType {
  user: IUser | undefined
  signInWithGoogle: () => Promise<void>
}

export const AuthContext = createContext({} as IAuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser>(() => {
    const user = localStorage.getItem('user')

    if (user) {
      return JSON.parse(user)
    }

    return undefined
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (user) => {
      try {
        if (user) {
          const { displayName, photoURL, uid } = user

          if (!displayName || !photoURL)
            throw new Error('Missing information from Google Account.')

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL,
          })
        }
      } catch (error) {
        toast.error('Faltam informações da Conta do Google.')
      }
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = useCallback(async () => {
    try {
      const { user } = await signInWithPopup(
        firebase.auth,
        firebase.googleProvider,
      )

      if (!user) throw new Error('Failed login with google account.')

      const { displayName, photoURL, uid } = user

      if (!displayName || !photoURL)
        throw new Error('Missing information from Google Account.')

      localStorage.setItem(
        'user',
        JSON.stringify({
          id: uid,
          name: displayName,
          avatar: photoURL,
        }),
      )

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    } catch (error) {
      toast.error('Falha ao fazer login com conta do Google.')
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
