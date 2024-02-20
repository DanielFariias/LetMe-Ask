import { ReactNode, createContext, useEffect, useState } from 'react'

import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'

import { firebase } from '../services/firebase'

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
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (user) => {
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
    })

    return () => unsubscribe()
  }, [])

  async function signInWithGoogle() {
    try {
      const { user } = await signInWithPopup(
        firebase.auth,
        firebase.googleProvider,
      )

      if (!user) throw new Error('Failed login with google account.')

      const { displayName, photoURL, uid } = user

      if (!displayName || !photoURL)
        throw new Error('Missing information from Google Account.')

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    } catch (error) {
      // TODO: Implement error handling with toast
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
