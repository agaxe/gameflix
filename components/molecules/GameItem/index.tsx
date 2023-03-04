import React from 'react';
import Link from 'next/link';
import { Image } from '@/components/atoms/Image';
import { Skeleton } from '@/components/atoms/Skeleton';
import { IGDB_COVER_URL } from '@/common/variables';
import { GameItemProps } from './interface';
import * as S from './styles';

// GameItem 스켈레톤
const GameItemSkeleton = () => {
  return (
    <div>
      <S.CoverImg skeleton={true}>
        <Skeleton width={100} height={125} />
      </S.CoverImg>
      <S.GameInfoList direction='column'>
        <Skeleton width={300} height={12} />
        <br />
        <Skeleton width={100} height={12} />
      </S.GameInfoList>
    </div>
  );
};

/**
 * - `name` 값은 게임이름 항목과 커버이미지의 alt값으로 사용됩니다.
 * - `skeleton` 값으로 스켈레톤 상태를 적용시킬 수 있습니다.
 */
export const GameItem = ({
  id,
  cover,
  name,
  releaseDate,
  skeleton = false
}: GameItemProps) => {
  return (
    <S.SearchItem>
      {skeleton ? (
        <GameItemSkeleton />
      ) : (
        <Link href={`/detail?id=${id}`}>
          <S.CoverImg>
            <Image
              src={`${IGDB_COVER_URL}/${cover}.jpg`}
              alt={`${name}-cover`}
            />
          </S.CoverImg>
          <S.GameInfoList direction='column'>
            <S.GameInfoItem>
              <h4>{name}</h4>
            </S.GameInfoItem>
            <S.GameInfoItem>
              <p>{releaseDate}</p>
            </S.GameInfoItem>
          </S.GameInfoList>
        </Link>
      )}
    </S.SearchItem>
  );
};
