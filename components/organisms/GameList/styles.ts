import styled from 'styled-components';
import { VAR_SIZE } from '@/static/styles/variable';

const { GAME_CARD_WIDTH } = VAR_SIZE;

export const GameListBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, ${GAME_CARD_WIDTH});
  justify-content: space-between;
`;
