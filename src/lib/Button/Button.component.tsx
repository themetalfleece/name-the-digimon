import { styled } from "solid-styled-components";

export const Button = styled("button")`
  background-color: ${({ theme }) => theme!.colors.white};
  color: ${({ theme }) => theme!.colors.black};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme!.colors.white};
  }
`;
