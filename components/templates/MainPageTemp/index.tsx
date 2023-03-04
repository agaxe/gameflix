import React from 'react';
import styled from 'styled-components';
import { MainVisual } from '@/components/molecules/MainVisual';
import { SectionTitle } from '@/components/molecules/SectionTitle';
import { GameList } from '@/components/organisms/GameList';
import { StreamList } from '@/components/organisms/StreamList';
import { MainPageTempProps } from './interface';

function MainPageTemp({
  comingSoonGames,
  popularGames,
  liveGameStreams
}: MainPageTempProps) {
  return (
    <>
      <MainVisual comingSoonGames={comingSoonGames} />
      <MainPageSection>
        <div>
          <SectionTitle title='인기 게임' />
          <GameList data={popularGames} />
        </div>
        <div>
          <SectionTitle title='실시간 게임방송' />
          <StreamList items={liveGameStreams} />
        </div>
      </MainPageSection>
    </>
  );
}
export default MainPageTemp;

const MainPageSection = styled.section`
  padding-top: 100px;
  & > div {
    margin-bottom: 60px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;
