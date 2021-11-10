import cx from "classnames";
import { ReactNode } from "react";

import * as C from "./styles";

type QuestionsProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isAnswered?: boolean;
  isHighlighted?: boolean;
  children: ReactNode;
};
export const Question = ({
  content,
  author,
  children,
  isAnswered,
  isHighlighted,
}: QuestionsProps): JSX.Element => {
  return (
    <C.Container
      className={cx(
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </C.Container>
  );
};

Question.defaultProps = {
  isAnswered: false,
  isHighlighted: false,
};
