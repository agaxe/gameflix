import React from 'react';
import Axios from 'axios';
import Head from 'next/head'
import { SearchPageTemp } from 'components/templates';
import { useRouter } from 'next/router';

// * type
type SearchPageProps = {
	data: any
}

// * component
function SearchPage({ data }: SearchPageProps) {

	const router = useRouter();

	return (
		<>
			<Head>
				<title>
					{(router.query.q)
						? `'${router.query.q}' 검색 결과 | 겜플릭스`
						: '검색어가 없습니다.'
					}
				</title>
			</Head>
			<SearchPageTemp data={data} />
		</>
	)
}
export default SearchPage

// * getServerSideProps
export async function getServerSideProps({ query }) {
	const { q } = query;

	// 공통 변수
	const TWITCH_ACCESS_TOKEN_URL = process.env.TWITCH_ACCESS_TOKEN_URL;
	const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;

	// access token
	const access_token = await Axios.post(TWITCH_ACCESS_TOKEN_URL).then(res => res.data.access_token)


	// ? 검색결과 리스트
	const SearchListFunc = async () => {

		// 검색어 앞글자 대문자로 변경
		function UpperCase(search) {
			return search.charAt(0).toUpperCase() + search.slice(1);
		}
		const search = (q) && UpperCase(q);

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
		return { props: { data: { success: true, SearchList, result: 'yes' } } }
	} else {
		return { props: { data: { success: false, SearchList: [], result: 'no' } } }
	}
}

