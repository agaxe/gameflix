import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Axios from 'axios';
import { DiscoverPageTemp } from 'components/templates';
import { useRouter } from 'next/router';
import { useGameApi } from 'hooks';

// * type
type DiscoverPageProps = {
	/** 장르 리스트 */
	genreList: any[],
}

// * component
function DiscoverPage({ genreList }: DiscoverPageProps) {

	const SITE_KO_NAME = process.env.SITE_KO_NAME;
	const router = useRouter();
	const [genresCheck, setGenresCheck] = useState([])
	const [releaseDate, setReleaseDate] = useState([2016, new Date().getFullYear()]);
	const [ratingScore, setRatingScore] = useState([30, 90]);
	const [sortValue, setSortValue] = useState(['aggregated_rating', 'desc'])
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
		<>
			<Head>
				<title>
					{` 탐색 | ${SITE_KO_NAME}`}
				</title>
			</Head>
			<DiscoverPageTemp
				data={resultData}
				genreList={genreList}
				genresCheckData={genresCheck}
				releaseDateData={releaseDate}
				ratingScoreData={ratingScore}
				sortValueData={sortValue}
				searchFunc={runFilterSearch}
			/>
		</>
	)
}
export default DiscoverPage;

// * getServerSideProps
export async function getServerSideProps() {

	const options = {
		endPoint: 'genres',
		fields: 'name',
		sort: 'id asc',
		limit: 500
	}

	// return 
	const genreList = await useGameApi(options);
	return { props: { genreList } }
}	