import type { Component, JSXElement } from 'solid-js';
import { Container } from './Layout.styles';
import { Text } from '../Text/Text.component';

export interface LayoutProps {
  children: JSXElement;
}

export const Layout: Component<LayoutProps> = props => {
  return (
    <Container>
      {props.children}
      <Text style={{ 'margin-top': '80px' }}>
        This app is not affiliated with or endorsed by Bandai or the Digimon
        franchise. All trademarks and copyrights belong to their respective
        owners.
      </Text>
    </Container>
  );
};
