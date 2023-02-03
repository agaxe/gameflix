import React from 'react';
import { Skeleton } from '@/components/atoms/Skeleton';
import { AvatarProps } from './interface';
import * as S from './styles';

export const Avatar = ({ skeleton = false, img }: AvatarProps) => {
  return (
    <>
      {skeleton ? (
        <Skeleton variant='circle' width={45} height={45} />
      ) : (
        <S.Wrap>
          <S.Avatar img={img} />
        </S.Wrap>
      )}
    </>
  );
};
