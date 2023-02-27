import React from 'react';
import { DetailNoGameInfoTitle } from '@/components/molecules/Detail/NoGameInfoTitle';
import * as S from './styles';

interface DetailInformationProps {
  data: {
    companyName: string;
    genresList: string;
    platformsList: string;
  };
}

export const DetailInformation = ({
  data: { companyName = '', genresList = '', platformsList = '' }
}: DetailInformationProps) => {
  return (
    <>
      {!companyName && !genresList && !platformsList ? (
        <DetailNoGameInfoTitle type='관련' />
      ) : (
        <S.GameInfoList direction='column'>
          {companyName && (
            <S.GameInfoItem>
              <S.GameInfoTitle>제작</S.GameInfoTitle>
              <S.GameInfoContent>{companyName}</S.GameInfoContent>
            </S.GameInfoItem>
          )}
          {genresList && (
            <S.GameInfoItem>
              <S.GameInfoTitle>장르</S.GameInfoTitle>
              <S.GameInfoContent>{genresList}</S.GameInfoContent>
            </S.GameInfoItem>
          )}
          {platformsList && (
            <S.GameInfoItem>
              <S.GameInfoTitle>플랫폼</S.GameInfoTitle>
              <S.GameInfoContent>{platformsList}</S.GameInfoContent>
            </S.GameInfoItem>
          )}
        </S.GameInfoList>
      )}
    </>
  );
};
