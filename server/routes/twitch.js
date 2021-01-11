const express = require('express');
const router = express.Router();
const Axios = require('axios');

// 공통 변수
const TWITCH_ACCESS_TOKEN_URL = process.env.TWITCH_ACCESS_TOKEN_URL;
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;

const TwitchRouteFunc = async () => {

	// access_token
	const access_token = await Axios.post(TWITCH_ACCESS_TOKEN_URL).then(res => res.data.access_token);


	router.get('/stream', async (req, res) => {

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
		const StreamList = await StreamListFunc();
		res.json({ success: true, StreamList });
	})

}
TwitchRouteFunc();

module.exports = router;