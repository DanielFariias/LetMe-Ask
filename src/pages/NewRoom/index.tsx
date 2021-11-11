import { FormEvent, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import * as C from "./styles";

export const NewRoom: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");

  const handleCreateRoom = async (e: FormEvent) => {
    e.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <img src={logoImg} alt="LetMe-Ask" />

          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              value={newRoom}
              // onChange={e => setNewRoom(e.target.value)}
              onChange={(e) => setNewRoom(e.target.value)}
              placeholder="Nome da sala"
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>{" "}
          </p>
        </div>
      </C.Main>
    </C.Container>
  );
};
