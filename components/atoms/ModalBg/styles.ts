import styled from 'styled-components';
import { ModalBgProps } from './inteface';

export const ModalBg = styled.div<ModalBgProps>`
  display: ${(props) => (props.state ? props.display : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
`;
