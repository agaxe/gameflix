import styled from 'styled-components';
import { List } from '@/components/atoms/List';
import { GameCard } from '@/components/molecules/GameCard';

// 검색결과 리스트
export const SearchList = styled(List)<{ flex: boolean; length: number }>`
  flex-wrap: wrap;
  margin-bottom: 20px;
  min-height: 360px;
  ${(props) => props.flex && props.length && `margin-bottom:50px;`}
  a {
    width: 100%;
  }
`;
// 검색결과 - 카드형
export const GameCardSearch = styled(GameCard)`
  margin-top: 20px;
  margin-right: 20px;
  &:nth-child(5n) {
    margin-right: 0;
  }
`;
