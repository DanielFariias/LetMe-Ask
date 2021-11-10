import copyImg from "../../assets/images/copy.svg";
import * as C from "./styles";

type RoomCodeProps = {
  code: string;
};

export const RoomCode = ({ code }: RoomCodeProps): JSX.Element => {
  const copyRoomCodeToClipBoard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <C.Container
      type="submit"
      className="room-code"
      onClick={copyRoomCodeToClipBoard}
    >
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala {code}</span>
    </C.Container>
  );
};
