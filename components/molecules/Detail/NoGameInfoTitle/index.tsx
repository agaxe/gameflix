import React from 'react';
import * as S from './styles';

interface DetailNoGameInfoTitleProps {
  type: string;
}

export const DetailNoGameInfoTitle = ({ type }: DetailNoGameInfoTitleProps) => {
  return <S.NoGameInfoTitle>{`${type} 정보가 없습니다 :(`}</S.NoGameInfoTitle>;
};
