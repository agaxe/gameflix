import React from 'react';
import Link from 'next/link';
import { Image } from '@/components/atoms/Image';
import { Skeleton } from '@/components/atoms/Skeleton';
import { IGDB_COVER_URL } from '@/common/variables';
import { GameCardProps } from './interface';
import * as S from './styles';

// GameCard 스켈레톤
const GameCardSkeleton = () => {
  return (
    <>
      <S.ImgBox>
        <Skeleton height='100%' />
      </S.ImgBox>
      <S.GameCardText>
        <strong>
          <Skeleton width={150} height={15} />
        </strong>
        <Skeleton width={50} height={15} />
      </S.GameCardText>
    </>
  );
};

/**
 * - `name` 값은 게임이름 항목과 커버이미지의 alt값으로 사용됩니다.
 * - `skeleton` 값으로 스켈레톤 상태를 적용시킬 수 있습니다.
 */
export const GameCard = ({
  id,
  cover,
  name,
  rating,
  releaseDate,
  className,
  skeleton = false
}: GameCardProps) => {
  return (
    <S.GameCard className={className}>
      {skeleton ? (
        <GameCardSkeleton />
      ) : (
        <Link href={`/detail/${id}`}>
          <S.ImgBox>
            <Image
              src={`${IGDB_COVER_URL}/${cover}.jpg`}
              alt={`${name}-cover`}
            />
          </S.ImgBox>
          <S.GameCardText>
            <strong>{name}</strong>
            {releaseDate && <p>{releaseDate}</p>}
            {typeof rating === 'number' ? (
              <p>{rating !== 0 ? <>{Math.floor(rating)}%</> : <>평가없음</>}</p>
            ) : null}
          </S.GameCardText>
        </Link>
      )}
    </S.GameCard>
  );
};
