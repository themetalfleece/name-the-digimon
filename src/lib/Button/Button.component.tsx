import { styled } from 'solid-styled-components';

export interface ButtonProps {
  variant?: 'success';
}

export const Button = styled('button')<ButtonProps>`
  background-color: ${({ theme, disabled, variant }) => {
    if (disabled) {
      return theme!.colors.disabled;
    }

    if (variant === 'success') {
      return theme!.colors.success;
    }

    return theme!.colors.white;
  }};
  color: ${({ theme }) => theme!.colors.black};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  box-sizing: border-box;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme!.colors.white};
  }
`;
