import styled from "styled-components";

export const Container = styled.button`
  height: 50px;
  border-radius: 8px;
  background-color: #835afd;
  color: #fff;
  padding: 0 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.6s;
  img {
    margin-right: 8px;
  }

  &:not(:disabled):hover {
    filter: brightness(0.85);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.outlined {
    background-color: #fff;
    border: 1px solid #835afd;
    color: #835afd;
  }
`;
