import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router'

import { database } from '../services/firebase'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

import illustraationImg from '../assets/images/illustration.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'

export const Home: React.FC = () => {
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  const handleCreateNewRoom = async () => {
    if (!user) {
      await signInWithGoogle()
    }
    history.push('/rooms/new')
  }

  const handleJoinRoom = async (e: FormEvent) => {
    e.preventDefault()

    if (roomCode.trim() === '') { return }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert('Room does not exist.')
      return
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed')
      return
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">

      <aside>
        <img src={illustraationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiéncia em tempo-real</p>
      </aside>

      <main>

        <div className="main-content" >
          <img src={logoImg} alt="Letmeask" />
          <button
            className="create-room"
            onClick={handleCreateNewRoom}
          >
            <img src={googleIconImg} alt="" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="digite o código da sala"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>

    </div>
  )
}
