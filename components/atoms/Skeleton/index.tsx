import React from 'react';
import { SkeletonProps } from './interface';
import * as S from './styles';

/**
 * - [material ui 의 skeleton](https://material-ui.com/@/components/skeleton/) 을 사용하였습니다.
 */
export const Skeleton = ({
  width,
  height,
  variant = 'text'
}: SkeletonProps) => {
  return <S.SkeletonBox variant={variant} width={width} height={height} />;
};
