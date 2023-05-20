import type { Component } from "solid-js";
import { Layout } from "./components/Layout/Layout.component";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider.component";
import { Game } from "./components/Game/Game.component";
import { RoundProvider } from "./features/round/round.store";

export const App: Component = () => {
  return (
    <ThemeProvider>
      <RoundProvider>
        <Layout>
          <Game />
        </Layout>
      </RoundProvider>
    </ThemeProvider>
  );
};
