const express = require('express');
const router = express.Router();
const Axios = require('axios');

// 공통 변수
const TWITCH_ACCESS_TOKEN_URL = process.env.TWITCH_ACCESS_TOKEN_URL;
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;

const GameRouteFunc = async () => {

	// access_token
	const access_token = await Axios.post(TWITCH_ACCESS_TOKEN_URL).then(res => res.data.access_token);

	// ? 인기 게임 리스트
	router.get('/popualr', async (req, res) => {
		const GameListFunc = async () => {

			// 조건 : 현재일 기준으로 6개월 전의 게임
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

		const GameList = await GameListFunc();
		res.json({ success: true, GameList });
	});


	// ? 게임 검색 결과 리스트
	router.get('/search/:word', async (req, res) => {

		// access token
		const access_token = await Axios.post(TWITCH_ACCESS_TOKEN_URL).then(res => res.data.access_token)
		const { word } = req.params;

		// ? 검색결과 리스트
		const SearchListFunc = async () => {

			// 검색어 앞글자 대문자로 변경
			function UpperCase(search) {
				return search.charAt(0).toUpperCase() + search.slice(1);
			}
			const search = UpperCase(word)

			// api
			const fields = "fields name, rating, aggregated_rating, cover.image_id, first_release_date;";
			const sort = "sort name asc; sort aggregated_rating desc; sort id asc;";
			const where = `where name = *"${search}"*;`;
			const limit = "limit 500;";
			const data = `${fields}${sort}${where}${limit}`;
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

		const SearchList = await SearchListFunc();

		// 검색결과 여부에 따른 전달값 조건문
		if (SearchList.length) {
			res.json({ success: true, SearchList, result: 'yes' });
		} else {
			res.json({ success: false, SearchList: [], result: 'no' });
		}
	})
}
GameRouteFunc();

module.exports = router;