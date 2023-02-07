import React from 'react';
import { MainPageTemp } from '@/components/templates';
import { useGameApi } from '@/hooks/useGameApi';
import { useTwitchApi } from '@/hooks/useTwitchApi';

//* type
type MainPageProps = {
  gameList: any[];
  streamList: any[];
  comingSoonList: any[];
};

// * component
function MainPage({ gameList, streamList, comingSoonList }: MainPageProps) {
  return (
    <MainPageTemp
      gameListData={gameList}
      streamListData={streamList}
      comingSoonData={comingSoonList}
    />
  );
}
export default MainPage;

// * getServerSideProps
export async function getServerSideProps() {
  const today = new Date();
  const todayTimeStamp = Math.floor(today.getTime() / 1000);
  const prevMonth = Math.floor(today.setMonth(today.getMonth() - 3) / 1000);

  // ? 인기 게임 리스트
  const gameList = await useGameApi({
    endPoint: 'games',
    fields: 'name, aggregated_rating, cover.image_id',
    where: `first_release_date >= ${prevMonth} & rating >= 70 & rating <= 90 & aggregated_rating != null`,
    sort: 'rating desc',
    limit: '5'
  });

  // ? 발매 예정 게임
  const comingSoonList = await useGameApi({
    endPoint: 'games',
    fields: 'name, screenshots.image_id, first_release_date',
    where: `first_release_date > ${todayTimeStamp} & screenshots != null`,
    sort: 'first_release_date asc',
    limit: '5'
  });

  // ? 게임 방송 리스트
  const streamListFunc = async () => {
    // 상위 5위 게임
    const gameTop = await useTwitchApi('games/top?first=5').then((res) =>
      res.data.filter((item, idx) => item.id !== '509658' && idx < 4)
    );

    // 해당 게임의 스트리머 정보 ( 아이디 x )
    let gameStreamer = await gameTop.map(async (item) => {
      const data = await useTwitchApi(`streams?game_id=${item.id}&first=3`);
      return data.data;
    });
    gameStreamer = await Promise.all(gameStreamer);

    // 게임정보 + 스트리머 정보 ( 아이디 o )
    const gameStreamInfo = await Promise.all(
      gameTop.map(async (game, index) => {
        const streamers = await Promise.all(
          gameStreamer[index].map((item, idx) => {
            return useTwitchApi(`users?id=${item['user_id']}`).then((res) => {
              return { ...item, ...res.data[0] };
            });
          })
        );
        return {
          num: index,
          game: game.name,
          game_img: game.box_art_url,
          streamers
        };
      })
    );
    return gameStreamInfo;
  };
  const streamList = await streamListFunc();

  return { props: { gameList, comingSoonList, streamList } };
}
