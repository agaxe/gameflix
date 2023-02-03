import styled from 'styled-components';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_PRIMARY, COLOR_WHITE, COLOR_LINE_GRAY } = VAR_COLOR;
const size = '20px';

export const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
  & + label {
    width: ${size};
    height: ${size};
    border: 1px solid ${COLOR_LINE_GRAY};
    border-radius: 5px;
    cursor: pointer;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    svg {
      opacity: 0;
    }
  }
  &:checked + label {
    color: ${COLOR_WHITE};
    border: 1px solid ${COLOR_PRIMARY};
    background: ${COLOR_PRIMARY};
    svg {
      opacity: 1;
    }
  }
`;
