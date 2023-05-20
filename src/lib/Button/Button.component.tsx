import { styled } from "solid-styled-components";

export const Button = styled("button")`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme!.colors.disabled : theme!.colors.white};
  color: ${({ theme }) => theme!.colors.black};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  box-sizing: border-box;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme!.colors.white};
  }
`;
