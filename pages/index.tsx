import React from 'react'
import Axios from 'axios';
import { MainPageTemp } from 'components/templates';

//* type 
type MainPageProps = {
	GameList: any[];
	StreamList: any[];
	ComingSoonList: any[];
}

// * component
function MainPage({ GameList, StreamList, ComingSoonList }: MainPageProps) {

	return (
		<MainPageTemp
			gameListData={GameList}
			streamListData={StreamList}
			ComingSoonData={ComingSoonList}
		/>
	)
}
export default MainPage;

// * getServerSideProps
export async function getServerSideProps() {

	// 공통 변수
	const TWITCH_ACCESS_TOKEN_URL = process.env.TWITCH_ACCESS_TOKEN_URL;
	const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;

	// access_token
	const access_token = await Axios.post(TWITCH_ACCESS_TOKEN_URL).then(res => res.data.access_token);

	// ? 인기 게임 리스트
	const GameListFunc = async () => {

		// 조건 : 현재일 기준으로 3개월 전의 게임
		const Today = new Date();
		const month6 = Math.floor(Today.setMonth((Today.getMonth() - 3)) / 1000)
		const fields = "fields *, cover.*, external_games.*, first_release_date, genres.*;";
		const sort = "sort rating desc;";
		const where = `where first_release_date >= ${month6} & rating >= 70 & rating <= 80 & aggregated_rating != null;`;
		const search = 'search "mario";';
		const limit = "limit 5; ";
		const data = `${fields}${where}${sort}${limit}`;
		const Games = await Axios({
			url: `https://api.igdb.com/v4/games`,
			method: "post",
			headers: {
				Accept: "application/json",
				"Client-ID": TWITCH_CLIENT_ID,
				Authorization: `Bearer ${access_token}`

			},
			data: data
		})
		return Games.data;
	}

	// ? 게임 방송 리스트
	const StreamListFunc = async () => {
		// 상위 5위 게임
		const GameTop = await Axios({
			url: 'https://api.twitch.tv/helix/games/top?first=5',
			method: "get",
			headers: {
				Accept: "application/json",
				"Client-ID": TWITCH_CLIENT_ID,
				Authorization: `Bearer ${access_token}`
			},
		}).then(res => res.data.data.filter((item, idx) => item.id !== "509658" && idx < 4))

		// 해당 게임의 스트리머 정보 ( 아이디 x )
		let GameStreamer = await GameTop.map(async (item, idx) => {
			const data = await Axios({
				url: `https://api.twitch.tv/helix/streams?game_id=${item.id}&first=3`,
				method: "get",
				headers: {
					Accept: "application/json",
					"Client-ID": TWITCH_CLIENT_ID,
					Authorization: `Bearer ${access_token}`
				}
			})
			return data.data.data;
		})
		GameStreamer = await Promise.all(GameStreamer);

		// 게임정보 + 스트리머 정보 ( 아이디 o )
		let Result = await GameTop.map(async (game, index) => {
			let st = GameStreamer[index].map((item, idx) => {
				return Axios({
					url: `https://api.twitch.tv/helix/users?id=${item.user_id}`,
					method: 'get',
					headers: {
						Accept: "application/json",
						"Client-ID": TWITCH_CLIENT_ID,
						Authorization: `Bearer ${access_token}`
					}
				}).then(res => {
					return { ...item, ...res.data.data[0] }
				})
			})
			st = await Promise.all(st);

			//return st;
			return {
				num: index,
				game: game.name,
				game_img: game.box_art_url,
				streamers: st
			}
		})
		Result = await Promise.all(Result);
		return Result;
	}


	// ? 발매 예정 게임
	const ComingSoonListFunc = async () => {

		const Today = Math.floor(new Date().getTime() / 1000)
		const fields = "fields *, cover.*, screenshots.*, first_release_date;";
		const sort = "sort first_release_date asc;";
		const where = `where first_release_date > ${Today} & screenshots != null;`;
		const limit = "limit 5; ";
		const data = `${fields}${where}${sort}${limit}`;
		const Games = await Axios({
			url: `https://api.igdb.com/v4/games`,
			method: "post",
			headers: {
				Accept: "application/json",
				"Client-ID": TWITCH_CLIENT_ID,
				Authorization: `Bearer ${access_token}`

			},
			data: data
		})
		return Games.data;
	}

	// * return
	const GameList = await GameListFunc();
	const StreamList = await StreamListFunc();
	const ComingSoonList = await ComingSoonListFunc();


	return { props: { GameList, StreamList, ComingSoonList } }
}