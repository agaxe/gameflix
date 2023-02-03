import React from 'react';
import styled from 'styled-components';
import { Button } from '@/components/atoms/Button';
import { pxToRem } from '@/static/styles/common';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_PRIMARY, COLOR_TERTIARY } = VAR_COLOR;

// * type
type ErrorPageTempProps = {
  /** 에러 코드 */
  statusCode: number;
};

// * component
/**
 * - 에러 페이지의 템플릿 컴포넌트 입니다.
 */
function ErrorPageTemp({ statusCode }: ErrorPageTempProps) {
  return (
    <ErrorBox>
      <div>
        {statusCode && <h2>{statusCode}</h2>}
        <p>에러가 발생하였습니다 :(</p>
        <a href='/'>
          <Button onClick={() => console.log('hi')}>
            메인 페이지로 이동하기
          </Button>
        </a>
      </div>
    </ErrorBox>
  );
}
export default ErrorPageTemp;

// * style
const ErrorBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #717171;
  text-align: center;
  h2 {
    font-size: ${pxToRem(60)};
    margin-bottom: 15px;
    letter-spacing: 0.1em;
  }
  p {
    font-size: ${pxToRem(35)};
  }
  a {
    text-decoration: none;
    button {
      cursor: pointer;
      color: ${COLOR_PRIMARY};
      background: ${COLOR_TERTIARY};
      margin-top: 30px;
      &:enabled:hover {
        background: ${COLOR_TERTIARY};
      }
      &:enabled:active {
        background: ${COLOR_TERTIARY};
      }
    }
  }
`;
