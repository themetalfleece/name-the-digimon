import { DefaultTheme, styled, CSSAttribute } from "solid-styled-components";

export interface TextProps {
  color?: keyof DefaultTheme["colors"];
  fontSize?: number;
  textAlign?: CSSAttribute["textAlign"];
}

export const Text = styled("p")<TextProps>`
  color: ${(props) => props.theme!.colors[props.color || "white"]};
  font-size: ${(props) => props.fontSize || 16}px;
  text-align: ${(props) => props.textAlign || "left"};
  margin: 0;
`;
