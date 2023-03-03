import React from 'react';
import { DetailNoGameInfoTitle } from '@/components/molecules/Detail/NoGameInfoTitle';
import { getArrayToString } from '@/utils/getArrayToString';
import * as S from './styles';

interface DetailInformationProps {
  data: {
    companies: any[];
    genres: any[];
    platforms: any[];
  };
}

export const DetailInformation = ({
  data: { companies = [], genres = [], platforms = [] }
}: DetailInformationProps) => {
  const companyName = companies.length ? companies[0].company.name : '';

  const genresText = genres.length
    ? getArrayToString(genres.map(({ name }) => name))
    : '';

  const platformsText = platforms
    ? getArrayToString(platforms.map(({ name }) => name))
    : '';

  return (
    <>
      {!companyName && !genresText && !platformsText ? (
        <DetailNoGameInfoTitle type='관련' />
      ) : (
        <S.GameInfoList direction='column'>
          {companyName && (
            <S.GameInfoItem>
              <S.GameInfoTitle>제작</S.GameInfoTitle>
              <S.GameInfoContent>{companyName}</S.GameInfoContent>
            </S.GameInfoItem>
          )}
          {genresText && (
            <S.GameInfoItem>
              <S.GameInfoTitle>장르</S.GameInfoTitle>
              <S.GameInfoContent>{genresText}</S.GameInfoContent>
            </S.GameInfoItem>
          )}
          {platformsText && (
            <S.GameInfoItem>
              <S.GameInfoTitle>플랫폼</S.GameInfoTitle>
              <S.GameInfoContent>{platformsText}</S.GameInfoContent>
            </S.GameInfoItem>
          )}
        </S.GameInfoList>
      )}
    </>
  );
};
