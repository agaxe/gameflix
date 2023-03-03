import styled from 'styled-components';
import { List } from '@/components/atoms/List';
import { pxToRem } from '@/static/styles/common';
import { VAR_SIZE } from '@/static/styles/variable';

const { CONTENT_WIDTH, STREAM_CARD_WIDTH } = VAR_SIZE;

export const LiveStreamList = styled(List)`
  display: grid;
  grid-template-columns: repeat(3, ${STREAM_CARD_WIDTH});
  justify-content: space-between;
`;

export const LiveListBox = styled.div`
  margin-bottom: 40px;
  width: ${CONTENT_WIDTH};
`;
export const GameTitle = styled.p`
  font-size: ${pxToRem(20)};
  margin-bottom: 20px;
`;
