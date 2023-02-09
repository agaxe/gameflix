import React from 'react';
import { SITE_EN_NAME } from '@/common/variables';
import * as S from './styles';

export const Footer = () => {
  const currentYear = new Date().getFullYear().toString();

  return (
    <S.Footer>
      <p>
        {currentYear} {SITE_EN_NAME.toUpperCase()}
      </p>
    </S.Footer>
  );
};
