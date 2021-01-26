import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { DiscoverPageTemp } from 'components/templates';
import { useRouter } from 'next/router';

// * type
type DiscoverPageProps = {
	/** 장르 리스트 */
	genreList: any[],
}

// * component
function DiscoverPage({ genreList }: DiscoverPageProps) {

	const router = useRouter();
	const [genresCheck, setGenresCheck] = useState([])
	const [releaseDate, setReleaseDate] = useState([2016, new Date().getFullYear()]);
	const [ratingScore, setRatingScore] = useState([30, 90]);
	const [sortValue, setSortValue] = useState([])
	const [resultData, setResultData] = useState({ success: null, filterGameList: [] });

	// 필터 검색
	const runFilterSearch = (genres, releaseDate, ratingScore, sortValue) => {
		setGenresCheck(genres);
		setReleaseDate(releaseDate);
		setRatingScore(ratingScore);
		setSortValue(sortValue);
		router.replace(router.asPath);
	}

	useEffect(() => {
		const filter = {
			genresCheck: genresCheck.toString(),
			releaseDate: releaseDate.toString(),
			ratingScore: ratingScore.toString(),
			sort: sortValue.toString()
		}

		Axios.get(`/api/game/discover`, { params: { filter } })
			.then(res => setResultData(res.data))
			.catch(err => console.log(err))
	}, [genresCheck, releaseDate, ratingScore, sortValue])

	return (
		<DiscoverPageTemp
			data={resultData}
			genreList={genreList}
			genresCheckData={genresCheck}
			releaseDateData={releaseDate}
			ratingScoreData={ratingScore}
			searchFunc={runFilterSearch}
		/>
	)
}
export default DiscoverPage;

// * getServerSideProps
export async function getServerSideProps() {

	// 공통 변수
	const TWITCH_ACCESS_TOKEN_URL = process.env.TWITCH_ACCESS_TOKEN_URL;
	const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;

	// access_token
	const access_token = await Axios.post(TWITCH_ACCESS_TOKEN_URL).then(res => res.data.access_token);

	// ? 게임 장르 리스트
	const GenresListFunc = async () => {
		// api
		const fields = "fields name;";
		const limit = "limit 30; ";
		const sort = "sort id asc;";
		const data = `${fields}${sort}${limit}`;
		const Genres = await Axios({
			url: `https://api.igdb.com/v4/genres`,
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
	const genreList = await GenresListFunc();
	return { props: { genreList } }
}	