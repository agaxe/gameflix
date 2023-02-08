import React from 'react';
import { PageTitleProps } from './interface';
import * as S from './styles';

/**
 * - 페이지별로 표시되는 메인 타이틀 입니다.
 */
export const PageTitle = ({ title, children }: PageTitleProps) => {
  return (
    <S.PageTitleBox>
      <h2>{title}</h2>
      <S.Line />
      {children && <S.PageTitleIcons>{children}</S.PageTitleIcons>}
    </S.PageTitleBox>
  );
};
