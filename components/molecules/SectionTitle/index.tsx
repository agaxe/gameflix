import React from 'react';
import { SectionTitleProps } from './interface';
import * as S from './styles';

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <S.SectionTitle>
      <h4>{title}</h4>
    </S.SectionTitle>
  );
};
