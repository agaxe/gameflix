import styled from 'styled-components';
import { pxToRem } from '@/static/styles/common';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_BLACK } = VAR_COLOR;

export const Footer = styled.footer`
  background: ${COLOR_BLACK};
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: ${pxToRem(24)};
    letter-spacing: 0.425em;
    color: #5a5a5a;
  }
`;
