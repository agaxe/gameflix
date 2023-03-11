import React from 'react';
import { NoResult } from '@/components/atoms/NoResult';
import { GameItem } from '@/components/molecules/GameItem';
import { NO_COVER_IMAGE } from '@/common/variables';
import { SearchListProps } from './interface';
import * as S from './styles';

/**
 * - molecules/GameCard 과
	molecules/GameItem 를 사용한 검색결과 리스트 입니다.
 * - `type` 의 **list** 와 **card** 로 리스트 형식을 지정 합니다. 
 */
export const SearchList = ({
  data = [],
  type = 'LIST',
  hasResult
}: SearchListProps) => {
  return (
    <S.SearchList flex={type === 'CARD' ? true : false} length={data.length}>
      {
        // 검색결과 - 리스트
        data.length && hasResult ? (
          data.map((item, idx) => {
            // 게임 출시 년도 ( 출시하지 않았을 경우 '출시 예정' )
            const year = item.first_release_date
              ? `(${new Date(item.first_release_date * 1000).getFullYear()})`
              : '정보 없음';

            return (
              <React.Fragment key={idx}>
                {type === 'LIST' ? (
                  <GameItem
                    key={idx}
                    id={item.id}
                    cover={item?.cover?.image_id || NO_COVER_IMAGE}
                    name={item.name}
                    releaseDate={year}
                  />
                ) : (
                  <S.GameCardSearch
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
        !data.length && !hasResult ? (
          <>
            {[...Array(5)].map((item, idx) => (
              <React.Fragment key={idx}>
                {type === 'LIST' ? (
                  <GameItem skeleton={true} />
                ) : (
                  <S.GameCardSearch skeleton={true} />
                )}
              </React.Fragment>
            ))}
          </>
        ) : (
          <NoResult title='검색' />
        )
      }
    </S.SearchList>
  );
};
