import type { Component } from 'solid-js';
import { Layout } from './lib/Layout/Layout.component';
import { ThemeProvider } from './lib/ThemeProvider/ThemeProvider.component';
import { Game } from './components/Game/Game.component';
import { RoundProvider } from './features/round/round.store';
import { queryClient } from './services/trpc.util';
import { QueryClientProvider } from '@tanstack/solid-query';

export const App: Component = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RoundProvider>
          <Layout>
            <Game />
          </Layout>
        </RoundProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
