import type { Component, JSXElement } from "solid-js";
import { Container } from "./Layout.styles";

export interface LayoutProps {
  children: JSXElement;
}

export const Layout: Component<LayoutProps> = (props) => {
  return <Container>{props.children}</Container>;
};
