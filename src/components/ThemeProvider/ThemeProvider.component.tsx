import { Component, JSXElement } from "solid-js";
import { ThemeProvider as StyledThemeProvider } from "solid-styled-components";
import { createGlobalStyles } from "solid-styled-components";

const theme = {
  colors: {
    info: "#c8c6f3",
    success: "#07eb0d",
    error: "#f6214e",
    background: "#030303",
    white: "#fefefe",
  },
};

declare module "solid-styled-components" {
  export interface DefaultTheme {
    colors: {
      info: string;
      success: string;
      error: string;
      background: string;
    };
  }
}

export interface ThemeProviderProps {
  children: JSXElement;
}

const GlobalStyles = () => {
  const Styles = createGlobalStyles`
    html,
    body {
      color: ${theme.colors.white};
      background-color: ${theme.colors.background};
    }
  `;
  return <Styles />;
};

export const ThemeProvider: Component<ThemeProviderProps> = (props) => {
  return (
    <>
      <GlobalStyles />
      <StyledThemeProvider theme={theme}>{props.children}</StyledThemeProvider>
    </>
  );
};
