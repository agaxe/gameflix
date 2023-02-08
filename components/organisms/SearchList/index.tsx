import React from 'react';
import styled from 'styled-components';
import { List } from '@/components/atoms/List';
import { NoResult } from '@/components/atoms/NoResult';
import { GameCard } from '@/components/molecules/GameCard';
import { GameItem } from '@/components/molecules/GameItem';
import { NO_COVER_IMAGE } from '@/common/variables';

// * type
type SearchListProps = {
  /** 검색결과 데이터 */
  data: any[];
  /** 검색결과 리스트 타입 */
  type: 'list' | 'card' | string;
  /** 검색결과 데이터 존재 여부 */
  result: 'yes' | 'no' | string;
};

// * component
/**
 * - [molecules/GameCard](/docs/component-molecules-gamecard--game-card) 과
	[molecules/GameItem](/docs/component-molecules-gameitem--game-item) 를 사용한 검색결과 리스트 입니다.
 * - `type` 의 **list** 와 **card** 로 리스트 형식을 지정 합니다. 
 */
function SearchListComp({ data = [], type, result }: SearchListProps) {
  return (
    <SearchList flex={type === 'card' ? true : false} length={data.length}>
      {
        // 검색결과 - 리스트
        data.length && result === 'yes' ? (
          data.map((item, idx) => {
            // 게임 출시 년도 ( 출시하지 않았을 경우 '출시 예정' )
            const year = item.first_release_date
              ? `(${new Date(item.first_release_date * 1000).getFullYear()})`
              : '정보 없음';

            return (
              <React.Fragment key={idx}>
                {type === 'list' ? (
                  <GameItem
                    key={idx}
                    id={item.id}
                    cover={item?.cover?.image_id || NO_COVER_IMAGE}
                    name={item.name}
                    releaseDate={year}
                  />
                ) : (
                  <GameCardSearch
                    id={item.id}
                    cover={item?.cover?.image_id || NO_COVER_IMAGE}
                    name={item.name}
                    releaseDate={year}
                  />
                )}
              </React.Fragment>
            );
          })
        ) : // 검색결과 - 로딩 스켈레톤
        !data.length && !result ? (
          <>
            {[...Array(5)].map((item, idx) => (
              <React.Fragment key={idx}>
                {type === 'list' ? (
                  <GameItem skeleton={true} />
                ) : (
                  <GameCardSearch skeleton={true} />
                )}
              </React.Fragment>
            ))}
          </>
        ) : (
          <NoResult title='검색' />
        )
      }
    </SearchList>
  );
}
export default SearchListComp;

// * defaultProps
SearchListComp.defaultProps = {
  type: 'list'
};

// * style
// 검색결과 리스트
const SearchList = styled(List)<{ flex: boolean; length: number }>`
  flex-wrap: wrap;
  margin-bottom: 20px;
  min-height: 360px;
  ${(props) => props.flex && props.length && `margin-bottom:50px;`}
  a {
    width: 100%;
  }
`;
// 검색결과 - 카드형
const GameCardSearch = styled(GameCard)`
  margin-top: 20px;
  margin-right: 20px;
  &:nth-child(5n) {
    margin-right: 0;
  }
`;
