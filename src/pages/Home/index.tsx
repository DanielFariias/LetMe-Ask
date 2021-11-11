import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import googleIconImg from "../../assets/images/google-icon.svg";
import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import * as C from "./styles";

export const Home: React.FC = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  const handleCreateNewRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  };

  const handleJoinRoom = async (e: FormEvent) => {
    e.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exist.");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  };

  return (
    <C.Container>
      <C.Aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </C.Aside>

      <C.Main>
        <div className="main-content">
          <img src={logoImg} alt="LetMe-ask" />
          <button
            type="submit"
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
      </C.Main>
    </C.Container>
  );
};
