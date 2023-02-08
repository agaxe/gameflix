import styled from 'styled-components';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_WHITE } = VAR_COLOR;

export const Gnb = styled.ul`
  color: ${COLOR_WHITE};
  display: flex;
  align-items: center;
  margin-left: auto;
  li {
    margin-right: 30px;
    &:last-of-type {
      margin-right: 0;
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
