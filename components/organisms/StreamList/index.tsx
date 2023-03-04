import React from 'react';
import { useEffect, useState } from 'react';
import { List } from '@/components/atoms/List';
import { Skeleton } from '@/components/atoms/Skeleton';
import { StreamCard } from '@/components/molecules/StreamCard';
import { StreamListProps } from './interface';
import * as S from './styles';

/**
 * - molecules/StreamCard 를 사용한 방송 리스트 입니다.
 */
export const StreamList = ({ items = [] }: StreamListProps) => {
  return (
    <>
      {items.length ? (
        items.map((game) => (
          <React.Fragment key={`${game.num}-${game.game}`}>
            <S.LiveListBox>
              <S.GameTitle>{game.game}</S.GameTitle>
              <S.LiveStreamList>
                {game.streamers.map((streamer) => (
                  <React.Fragment key={streamer.id}>
                    <StreamCard
                      id={streamer.login}
                      name={streamer.display_name}
                      title={streamer.title}
                      profileImg={streamer.profile_image_url}
                      thumbnail={streamer.thumbnail_url}
                      viewer={streamer.viewer_count}
                    />
                  </React.Fragment>
                ))}
              </S.LiveStreamList>
            </S.LiveListBox>
          </React.Fragment>
        ))
      ) : (
        <>
          {[...Array(3)].map((item, idx) => (
            <S.LiveListBox key={idx}>
              <S.GameTitle>
                <Skeleton width={150} height={15} />
              </S.GameTitle>
              <List justify='space-between'>
                {[...Array(3)].map((item, index) => (
                  <StreamCard key={index} skeleton={true} />
                ))}
              </List>
            </S.LiveListBox>
          ))}
        </>
      )}
    </>
  );
};
