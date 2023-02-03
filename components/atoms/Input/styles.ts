import styled from 'styled-components';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_GRAY } = VAR_COLOR;

export const Input = styled.input`
  background: ${COLOR_GRAY};
  color: #595959;
  border: 0;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px 15px;
  outline: none;
  &::placeholder {
    color: #9b9b9b;
  }
`;
