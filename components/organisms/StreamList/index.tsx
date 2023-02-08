import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { List } from '@/components/atoms/List';
import { Skeleton } from '@/components/atoms/Skeleton';
import { StreamCard } from '@/components/molecules/StreamCard';
import { pxToRem } from '@/static/styles/common';
import { VAR_SIZE } from '@/static/styles/variable';

const { CONTENT_WIDTH } = VAR_SIZE;

// * type
type StreamListProps = {
  /** 게임 & 스트리머 데이터 */
  data: any[];
};

// * component
/**
 * - [molecules/StreamCard](/docs/component-molecules-streamcard--stream-card) 를 사용한 방송 리스트 입니다.
 */
function StreamList({ data }: StreamListProps) {
  const [LiveList, setLiveList] = useState([]);

  useEffect(() => {
    data && setLiveList(data);
  }, [data]);

  return (
    <>
      {LiveList.length ? (
        LiveList.map((game, idx) => (
          <React.Fragment key={idx}>
            <LiveListBox>
              <GameTitle>{game.game}</GameTitle>
              <List justify='space-between'>
                {game.streamers.map((item, index) => (
                  <React.Fragment key={index}>
                    <StreamCard
                      id={item.login}
                      name={item.display_name}
                      title={item.title}
                      profileImg={item.profile_image_url}
                      thumbnail={item.thumbnail_url}
                      viewer={item.viewer_count}
                    />
                  </React.Fragment>
                ))}
              </List>
            </LiveListBox>
          </React.Fragment>
        ))
      ) : (
        <>
          {[...Array(3)].map((item, idx) => (
            <LiveListBox key={idx}>
              <GameTitle>
                <Skeleton width={150} height={15} />
              </GameTitle>
              <List justify='space-between'>
                {[...Array(3)].map((item, index) => (
                  <StreamCard key={index} skeleton={true} />
                ))}
              </List>
            </LiveListBox>
          ))}
        </>
      )}
    </>
  );
}
export default StreamList;

// * style
const LiveListBox = styled.div`
  margin-bottom: 40px;
  width: ${CONTENT_WIDTH};
`;
const GameTitle = styled.p`
  font-size: ${pxToRem(20)};
  margin-bottom: 20px;
`;
