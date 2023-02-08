import React from 'react';
import styled from 'styled-components';
import { MainVisual } from '@/components/molecules/MainVisual';
import { SectionTitle } from '@/components/molecules/SectionTitle';
import { GameList, StreamList } from '@/components/organisms';

// * type
type MainPageTempProps = {
  /** 발매 예정 게임 데이터 */
  comingSoonData: any[];
  /** 인기 게임 리스트 데이터 */
  gameListData: any[];
  /** 실시간 방송 리스트 데이터 */
  streamListData: any[];
};

// * component
/**
 * - 메인 페이지의 템플릿 컴포넌트 입니다.
 */
function MainPageTemp({
  comingSoonData,
  gameListData,
  streamListData
}: MainPageTempProps) {
  return (
    <>
      <MainVisual comingSoonData={comingSoonData} />
      <MainPageSection>
        <div>
          <SectionTitle title='인기 게임' />
          <GameList data={gameListData} />
        </div>
        <div>
          <SectionTitle title='실시간 게임방송' />
          <StreamList data={streamListData} />
        </div>
      </MainPageSection>
    </>
  );
}
export default MainPageTemp;

// * style
// 메인 페이지 seciton
const MainPageSection = styled.section`
  padding-top: 100px;
  & > div {
    margin-bottom: 60px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;
