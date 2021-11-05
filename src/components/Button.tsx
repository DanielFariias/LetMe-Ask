import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export const Button: React.FC<Props> = ({ isOutlined, ...props }) => {
  return (
    <button
      type="submit"
      className={`button ${isOutlined ? "outlined" : ""}`}
      {...props}
    />
  );
};
