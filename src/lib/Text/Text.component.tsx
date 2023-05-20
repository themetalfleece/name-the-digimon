import { DefaultTheme, styled } from "solid-styled-components";

export interface TextProps {
  color?: keyof DefaultTheme["colors"];
  fontSize?: number;
}

export const Text = styled("p")<TextProps>`
  color: ${(props) => props.theme!.colors[props.color || "white"]};
  font-size: ${(props) => props.fontSize || 16}px;
`;
