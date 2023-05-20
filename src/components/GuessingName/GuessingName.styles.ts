import { styled } from "solid-styled-components";
import { Text } from "../../lib/Text/Text.component";

export const NameContainer = styled("div")`
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Letter = styled(Text)`
  font-size: 32px;
  font-weight: 500;
`;
