import type { Component } from 'solid-js';
import { Layout } from './lib/Layout/Layout.component';
import { ThemeProvider } from './lib/ThemeProvider/ThemeProvider.component';
import { Game } from './components/Game/Game.component';
import { RoundProvider } from './features/round/round.store';
import { ProgressProvider } from './features/progress/progress.store';

export const App: Component = () => {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <RoundProvider>
          <Layout>
            <Game />
          </Layout>
        </RoundProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
};
