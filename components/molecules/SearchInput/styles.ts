import styled from 'styled-components';
import { Input } from '@/components/atoms/Input';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_WHITE } = VAR_COLOR;

// 검색 input 박스
export const SearchInputBox = styled.div`
  position: relative;
  width: 300px;
`;

// 검색 버튼
export const SearchBtn = styled.span`
  position: absolute;
  height: 100%;
  right: 0px;
  top: 50%;
  transform: translate(0%, -50%);
  color: ${COLOR_WHITE};
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #595959;
  cursor: pointer;
`;

// 검색 input
export const SearchInput = styled(Input)`
  width: 100%;
  padding-right: 45px;
`;
