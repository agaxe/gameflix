import styled from 'styled-components';
import { STYLE_BOX_SHADOW, STYLE_ELLIPSIS } from '@/static/styles/common';
import { VAR_COLOR, VAR_SIZE } from '@/static/styles/variable';

const { COLOR_WHITE } = VAR_COLOR;
const { GAME_CARD_WIDTH } = VAR_SIZE;

// 게임 카드
export const GameCard = styled.li`
  ${STYLE_BOX_SHADOW};
  width: ${GAME_CARD_WIDTH};
`;
// 게임 커버 이미지 박스
export const ImgBox = styled.div`
  width: 100%;
  height: 293px;
  position: relative;
`;
// 게임 카드 정보 박스
export const GameCardText = styled.div`
  background: ${COLOR_WHITE};
  padding: 12px;
  box-sizing: border-box;
  border-top: 1px solid #dadada;
  font-size: 1rem;
  strong {
    margin-bottom: 10px;
    ${STYLE_ELLIPSIS}
  }
`;
