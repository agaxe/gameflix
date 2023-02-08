import React from 'react';
import { Avatar } from '@/components/atoms/Avatar';
import { Item } from '@/components/atoms/Item';
import { List } from '@/components/atoms/List';
import { Skeleton } from '@/components/atoms/Skeleton';
import { StreamCardProps } from './interface';
import * as S from './styles';

// StreamCard 스켈레톤
const StreamCardSkeleton = () => {
  return (
    <>
      <Skeleton height={208} />
      <S.StreamerInfo>
        <Avatar skeleton={true} />
        <List flex={false}>
          <Item>
            <Skeleton width={100} height={10} />
          </Item>
          <Item>
            <Skeleton width={200} height={10} />
          </Item>
        </List>
      </S.StreamerInfo>
    </>
  );
};

/**
 * - 게임별로 트위치에서 방송중인 스트리머를 보여주는 카드 컴포넌트 입니다.
 */
export const StreamCard = ({
  id,
  name,
  title,
  profileImg,
  thumbnail,
  viewer,
  skeleton
}: StreamCardProps) => {
  const thumbnailUrl =
    thumbnail?.replace('{width}', '369').replace('{height}', '208') || '';
  const profileImgUrl = profileImg?.replace('300x300.png', '70x70.png') || '';

  return (
    <S.StreamCard>
      {skeleton ? (
        <StreamCardSkeleton />
      ) : (
        <a
          href={`https://www.twitch.tv/${id}`}
          target='_blank'
          rel='noreferrer'
        >
          <S.Thumbnail>
            <S.LiveLabel>LIVE</S.LiveLabel>
            <img src={thumbnailUrl} alt={`${id}_thumbnail`} />
            <S.ViewerBox>시청자 {viewer.toLocaleString()}명</S.ViewerBox>
          </S.Thumbnail>
          <S.StreamerInfo>
            <Avatar img={profileImgUrl} />
            <S.StreamerInfoList flex={false}>
              <Item>
                <S.StreamerTitle>{name}</S.StreamerTitle>
              </Item>
              <Item>
                <S.StreamerDesc>{title}</S.StreamerDesc>
              </Item>
            </S.StreamerInfoList>
          </S.StreamerInfo>
        </a>
      )}
    </S.StreamCard>
  );
};
