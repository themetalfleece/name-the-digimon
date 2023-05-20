import type { Component } from "solid-js";
import { Layout } from "./components/Layout/Layout.component";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider.component";
import { Game } from "./components/Game/Game.component";

export const App: Component = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Game />
      </Layout>
    </ThemeProvider>
  );
};
