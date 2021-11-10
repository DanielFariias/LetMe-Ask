import styled from "styled-components";

export const Container = styled.button`
  height: 40px;
  border-radius: 8px;
  overflow: hidden;

  background: #ffffff;
  border: 1px solid #835afd;
  cursor: pointer;

  display: flex;
  transition: 0.2s ease-in;

  &:hover {
    filter: brightness(0.9);
  }

  div {
    height: 100%;
    background: #835afd;
    padding: 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 16px 0 12px;
    width: 230px;
    font-size: 14px;
    font-weight: 500;
  }
`;
