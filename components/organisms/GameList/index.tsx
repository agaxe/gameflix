import React, { useEffect, useState } from 'react';
import { GameCard } from '@/components/molecules/GameCard';
import { NO_COVER_IMAGE } from '@/common/variables';
import { GameListProps } from './interface';
import * as S from './styles';

/**
 * - molecules/GameCard 컴포넌트를 사용한 카드형 리스트 컴포넌트 입니다.
 */
export const GameList = ({ data = [], className }: GameListProps) => {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    data.length && setGameList(data);
  }, [data]);

  return (
    <S.GameListBox className={className}>
      <>
        {gameList.length ? (
          gameList.map((item) => (
            <GameCard
              id={item.id}
              key={item.id}
              cover={item?.cover?.image_id || NO_COVER_IMAGE}
              name={item.name}
              rating={item.aggregated_rating}
            />
          ))
        ) : (
          <>
            {[...Array(5)].map((item, idx) => (
              <GameCard key={idx} skeleton={true} />
            ))}
          </>
        )}
      </>
    </S.GameListBox>
  );
};
