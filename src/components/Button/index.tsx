import { ReactNode } from "react";

import * as C from "./styles";

type Props = {
  isOutlined?: boolean;
  onClick?: () => void;
  children: ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
};

export const Button = ({
  isOutlined,
  onClick,
  children,
  type,
  disabled,
}: Props): JSX.Element => {
  return (
    <C.Container
      type={type}
      className={`button ${isOutlined ? "outlined" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </C.Container>
  );
};

Button.defaultProps = {
  isOutlined: false,
  onClick: undefined,
  disabled: false,
};
