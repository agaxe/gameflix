import styled from 'styled-components';
import { Item } from '@/components/atoms/Item';
import { List } from '@/components/atoms/List';
import { STYLE_ELLIPSIS } from '@/static/styles/common';

// * styles
// 검색결과 리스트 - 항목
export const SearchItem = styled(Item)`
  & > * {
    display: flex;
    align-items: center;
    padding: 20px 0;
  }
`;
// 커버 이미지 박스
export const CoverImg = styled.div<{ skeleton?: boolean }>`
  position: relative;
  height: 125px;
  width: 100px;
  margin-right: 30px;
  box-sizing: border-box;
`;
// 커버 이미지
export const Img = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
// 게임 정보 리스트
export const GameInfoList = styled(List)`
  width: 60%;
`;
// 게임 정보 리스트 - 항목
export const GameInfoItem = styled(Item)`
  & > * {
    padding: 5px 0;
    ${STYLE_ELLIPSIS};
  }
  &:first-of-type {
    margin-bottom: 5px;
  }
`;
