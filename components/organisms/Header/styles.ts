import styled from 'styled-components';
import { SearchInput } from '@/components/molecules/SearchInput';
import { VAR_COLOR, VAR_SIZE } from '@/static/styles/variable';

const { HEADER_HEIGHT } = VAR_SIZE;
const { COLOR_BLACK } = VAR_COLOR;

// 헤더 스타일
export const Header = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  background: ${COLOR_BLACK};
  height: ${HEADER_HEIGHT};
  display: flex;
  align-items: center;
  padding: 0 50px;
  box-sizing: border-box;
  svg {
    width: 20px;
    height: 20px;
  }
`;

// 헤더 - 검색 input
export const HeaderSearchInput = styled(SearchInput)`
  margin-left: 20%;
  width: 450px;
  input {
    background: #8c8c8c;
    color: #d7d7d7;
    &:focus {
      background: #9c9c9c;
    }
    &::placeholder {
      color: #d7d7d7;
    }
  }
  svg {
    color: #d7d7d7;
  }
`;
