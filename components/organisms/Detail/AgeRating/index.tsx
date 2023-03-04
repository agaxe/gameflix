import React from 'react';
import { Image } from '@/components/atoms/Image';
import { DetailNoGameInfoTitle } from '@/components/molecules/Detail/NoGameInfoTitle';
import { IGDB_COVER_URL } from '@/common/variables';
import * as S from './styles';

interface DeatailAgeRatingProps {
  ageRatings: any[];
}

export const DeatailAgeRating = ({
  ageRatings = []
}: DeatailAgeRatingProps) => {
  const ageRatingImg = (category, rating) => {
    const categoryText = category === 1 ? 'ESRB' : 'PEGI';
    const imgExt = category === 1 ? 'svg' : 'png';
    const imgSrc = `${categoryText}_${rating}.${imgExt}`;

    return `${categoryText}/${imgSrc}`;
  };

  return (
    <div>
      {ageRatings.length ? (
        <S.AgeRatingList>
          {ageRatings.map((item, idx) => (
            <S.AgeRatingItem key={idx}>
              <Image
                src={`/static/images/game_rating/${ageRatingImg(
                  item.category,
                  item.rating
                )}`}
                alt={`${ageRatingImg(item.category, item.rating)}`}
                fallbackSrc={`${IGDB_COVER_URL}/undefined.jpg`}
              />
            </S.AgeRatingItem>
          ))}
        </S.AgeRatingList>
      ) : (
        <DetailNoGameInfoTitle type='등급' />
      )}
    </div>
  );
};
