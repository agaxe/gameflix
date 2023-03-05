import React from 'react';
import * as S from './styles';

interface ErrorPageTempProps {
  statusCode: number;
}

export function ErrorPageTemp({ statusCode }: ErrorPageTempProps) {
  return (
    <S.ErrorWrap>
      <div>
        {statusCode && <S.ErrorTitle>{statusCode}</S.ErrorTitle>}
        <S.ErrorDesc>에러가 발생하였습니다 :(</S.ErrorDesc>
        <S.ErrorLink href='/'>
          <S.ErrorBtn>메인 페이지로 이동하기</S.ErrorBtn>
        </S.ErrorLink>
      </div>
    </S.ErrorWrap>
  );
}
