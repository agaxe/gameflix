import styled, { css } from 'styled-components';
import { pxToRem } from '@/static/styles/common';
import { VAR_COLOR } from '@/static/styles/variable';
import { ButtonProps } from './interface';

const { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_TERTIARY, COLOR_WHITE } =
  VAR_COLOR;

// 버튼 - 테마
export const themes = {
  primary: css`
    background: ${COLOR_PRIMARY};
    color: ${COLOR_WHITE};
    &:enabled:hover {
      background: #d04d4d;
    }
    &:enabled:active {
      background: ${COLOR_PRIMARY};
    }
    &:disabled {
      background: #d17676;
    }
  `,
  secondary: css`
    background: ${COLOR_SECONDARY};
    color: ${COLOR_WHITE};
    &:enabled:hover {
      background: rgba(0, 0, 0, 0.8);
    }
    &:enabled:active {
      background: ${COLOR_SECONDARY};
    }
    &:disabled {
      background: #4b4b4b;
    }
  `,
  tertiary: css`
    background: none;
    color: ${COLOR_PRIMARY};
    &:enabled:hover {
      background: ${COLOR_TERTIARY};
    }
    &:enabled:active {
      background: none;
    }
  `
};

// 버튼 기본 스타일
export const Button = styled.button<Pick<ButtonProps, 'theme'>>`
  font-size: 1rem;
  padding: 1rem;
  outline: none;
  border: none;
  box-sizing: border-box;
  border-radius: ${pxToRem(4)};
  line-height: 1;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => themes[theme]};
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
