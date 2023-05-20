import type { Component } from "solid-js";
import { Layout } from "./components/Layout/Layout.component";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider.component";

export const App: Component = () => {
  return (
    <ThemeProvider>
      <Layout>
        <h1>Name the Digimon</h1>
      </Layout>
    </ThemeProvider>
  );
};
