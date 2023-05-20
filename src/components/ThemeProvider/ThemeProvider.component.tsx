import { Component, JSXElement } from "solid-js";
import {
  styled,
  ThemeProvider as StyledThemeProvider,
} from "solid-styled-components";

const theme = {
  colors: {
    info: "#c8c6f3",
    success: "#07eb0d",
    error: "#f6214e",
  },
};

declare module "solid-styled-components" {
  export interface DefaultTheme {
    colors: {
      info: string;
      success: string;
      error: string;
    };
  }
}

export interface ThemeProviderProps {
  children: JSXElement;
}

export const ThemeProvider: Component<ThemeProviderProps> = (props) => {
  return (
    <StyledThemeProvider theme={theme}>{props.children}</StyledThemeProvider>
  );
};
