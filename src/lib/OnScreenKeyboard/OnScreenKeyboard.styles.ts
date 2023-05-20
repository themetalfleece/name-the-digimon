import { styled } from 'solid-styled-components';
import { Button } from '../Button/Button.component';

export const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
  max-width: 360px;
  gap: 10px;
  justify-content: center;
`;

export const LetterButton = styled(Button)`
  font-size: 14px;
  border-radius: 10px;
  font-weight: 500;
`;
