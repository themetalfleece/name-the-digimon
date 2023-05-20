import type { Component } from "solid-js";
import { Layout } from "./lib/Layout/Layout.component";
import { ThemeProvider } from "./lib/ThemeProvider/ThemeProvider.component";
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
