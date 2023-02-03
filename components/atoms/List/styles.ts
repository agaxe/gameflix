import styled from 'styled-components';
import { ListProps } from './inteface';

export const List = styled.ul<ListProps>`
  display: ${(props) => (props.flex ? 'flex' : 'block')};
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  flex-direction: ${(props) => props.direction};
`;
