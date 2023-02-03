import React from 'react';
import { NoResultProps } from './interface';
import * as S from './styles';

export const NoResult = ({ title }: NoResultProps) => {
  return (
    <S.NoResult>
      <h4>{title}결과가 없습니다 :(</h4>
    </S.NoResult>
  );
};
