import styled from 'styled-components';
import { pxToRem } from '@/static/styles/common';
import { VAR_SIZE } from '@/static/styles/variable';

const { CONTENT_WIDTH } = VAR_SIZE;

export const LiveListBox = styled.div`
  margin-bottom: 40px;
  width: ${CONTENT_WIDTH};
`;
export const GameTitle = styled.p`
  font-size: ${pxToRem(20)};
  margin-bottom: 20px;
`;
