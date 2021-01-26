import Axios from 'axios';

export default async function (req, res) {

	// 공통 변수
	const TWITCH_ACCESS_TOKEN_URL = process.env.TWITCH_ACCESS_TOKEN_URL;
	const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;

	// access_token
	const access_token = await Axios.post(TWITCH_ACCESS_TOKEN_URL).then(res => res.data.access_token);

	// * 쿼리값
	const filter = JSON.parse(req.query.filter);
	const { genresCheck, releaseDate, ratingScore, sort } = filter;

	// 배열로 변환
	const stringToArray = (string) => string.split(',');

	// 년도를 timestamp 로 변환
	const stringToTimeStamp = (year, kind) => {
		const month = (kind === 'start') ? '01/01' : '12/31';
		return Math.round(new Date(`${year}/${month} 09:00:00 GMT`).getTime() / 1000);
	}

	const releaseArray = stringToArray(releaseDate);
	const ratingArray = stringToArray(ratingScore);
	const sortArray = stringToArray(sort);

	// 필터링 조건값
	const genresValue = (genresCheck) ? `= (${genresCheck})` : '!= null';
	const releaseValue = `( first_release_date >= ${stringToTimeStamp(releaseArray[0], 'start')} & first_release_date <= ${stringToTimeStamp(releaseArray[1], 'end')} )`;
	const ratingValue = (ratingArray[0] === ratingArray[1]) ? `aggregated_rating = ${ratingArray[0]}` : `(aggregated_rating >= ${ratingArray[0]} & aggregated_rating <= ${ratingArray[1]})`;
	const sortValue = `${sortArray[0]} ${sortArray[1]}`;

	// ? 필터 검색 결과 리스트
	const FilterGameListFunc = async () => {
		// api
		const fields = "fields *, cover.*, external_games.*, first_release_date, genres;";
		const limit = "limit 500;";
		const sort = `sort ${sortValue};`;
		const where = `where genres ${genresValue} & ${ratingValue} & ${releaseValue};`
		const data = `${fields}${where}${sort}${limit}`;
		const Genres = await Axios({
			url: `https://api.igdb.com/v4/games`,
			method: "post",
			headers: {
				Accept: "application/json",
				"Client-ID": TWITCH_CLIENT_ID,
				Authorization: `Bearer ${access_token}`
			},
			data: data
		})
		return Genres.data;
	}
	// return  
	const filterGameList = await FilterGameListFunc();
	res.json({ success: true, filterGameList });
}