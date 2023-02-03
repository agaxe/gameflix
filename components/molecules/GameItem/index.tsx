import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Item } from '@/components/atoms/Item';
import { List } from '@/components/atoms/List';
import { Skeleton } from '@/components/atoms/Skeleton';
import { IGDB_COVER_URL } from '@/common/variables';
import { STYLE_ELLIPSIS } from '@/static/styles/common';

// * type
type GameItemProps = {
  /** 게임 아이디 */
  id?: number;
  /** 커버 이미지 아이디 */
  cover?: string;
  /** 게임 이름 */
  name?: string;
  /** 게임 출시 년도 */
  releaseDate?: string | number;
  /** 스켈레톤 여부 */
  skeleton?: boolean;
};

// * component
/**
 * - `name` 값은 게임이름 항목과 커버이미지의 alt값으로 사용됩니다.
 * - `skeleton` 값으로 스켈레톤 상태를 적용시킬 수 있습니다.
 */
function GameItemComp({
  id,
  cover,
  name,
  releaseDate,
  skeleton
}: GameItemProps) {
  // GameItem 스켈레톤
  const GameItemSkeleton = () => {
    return (
      <div>
        <CoverImg skeleton={true}>
          <Skeleton width={100} height={125} />
        </CoverImg>
        <GameInfoList direction='column'>
          <Skeleton width={300} height={12} />
          <br />
          <Skeleton width={100} height={12} />
        </GameInfoList>
      </div>
    );
  };

  return (
    <SearchItem>
      {skeleton ? (
        <GameItemSkeleton />
      ) : (
        <Link href={`/detail?id=${id}`}>
          <CoverImg>
            <Img src={`${IGDB_COVER_URL}${cover}.jpg`} alt={`${name}-cover`} />
          </CoverImg>
          <GameInfoList direction='column'>
            <GameInfoItem>
              <h4>{name}</h4>
            </GameInfoItem>
            <GameInfoItem>
              <p>{releaseDate}</p>
            </GameInfoItem>
          </GameInfoList>
        </Link>
      )}
    </SearchItem>
  );
}
export default GameItemComp;

// * defaultprops
GameItemComp.defaultProps = {
  skeleton: false
};

// * styles
// 검색결과 리스트 - 항목
const SearchItem = styled(Item)`
  & > * {
    display: flex;
    align-items: center;
    padding: 20px 0;
  }
`;
// 커버 이미지 박스
const CoverImg = styled.div<{ skeleton?: boolean }>`
  position: relative;
  height: 125px;
  width: 100px;
  margin-right: 30px;
  box-sizing: border-box;
`;
// 커버 이미지
const Img = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
// 게임 정보 리스트
const GameInfoList = styled(List)`
  width: 60%;
`;
// 게임 정보 리스트 - 항목
const GameInfoItem = styled(Item)`
  & > * {
    padding: 5px 0;
    ${STYLE_ELLIPSIS};
  }
  &:first-of-type {
    margin-bottom: 5px;
  }
`;
