import Axios from 'axios';

export default async function useTwitchApi(endPoint: string) {

	// 공통 변수
	const TWITCH_ACCESS_TOKEN_URL = process.env.TWITCH_ACCESS_TOKEN_URL;
	const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;

	// access_token
	const access_token = await Axios.post(TWITCH_ACCESS_TOKEN_URL).then(res => res.data.access_token);

	const result = await Axios({
		url: `https://api.twitch.tv/helix/${endPoint}`,
		method: "get",
		headers: {
			Accept: "application/json",
			"Client-ID": TWITCH_CLIENT_ID,
			Authorization: `Bearer ${access_token}`
		}
	})
	return result.data;
}



