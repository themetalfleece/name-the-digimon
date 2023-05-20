import { styled } from "solid-styled-components";

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Header = styled("h1")`
  color: ${({ theme }) => theme!.colors.info};
`;

export const DigimonAvatar = styled("img")`
  border-radius: 18px;
  max-width: 100%;
`;

export const NameContainer = styled("div")`
  display: flex;
  gap: 8px;
  font-size: 32px;
  justify-content: center;
  flex-wrap: wrap;
`;
