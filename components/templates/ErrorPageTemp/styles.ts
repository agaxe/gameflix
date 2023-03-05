import Link from 'next/link';
import styled from 'styled-components';
import { Button } from '@/components/atoms/Button';
import { pxToRem } from '@/static/styles/common';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_PRIMARY, COLOR_TERTIARY } = VAR_COLOR;

export const ErrorWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #717171;
  text-align: center;
`;

export const ErrorTitle = styled.h2`
  font-size: ${pxToRem(60)};
  margin-bottom: 15px;
  letter-spacing: 0.1em;
`;

export const ErrorDesc = styled.p`
  font-size: ${pxToRem(35)};
`;

export const ErrorLink = styled(Link)`
  text-decoration: none;
`;

export const ErrorBtn = styled(Button)`
  cursor: pointer;
  color: ${COLOR_PRIMARY};
  background-color: ${COLOR_TERTIARY};
  margin-top: 30px;
  &:enabled:hover {
    background-color: ${COLOR_TERTIARY};
  }
  &:enabled:active {
    background-color: ${COLOR_TERTIARY};
  }
`;
