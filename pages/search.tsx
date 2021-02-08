import React from 'react';
import Head from 'next/head'
import { SearchPageTemp } from 'components/templates';
import { useRouter } from 'next/router';
import { useGameApi } from 'hooks';

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

	// 검색어 앞글자 대문자로 변경
	function upperCase(search) {
		return search.charAt(0).toUpperCase() + search.slice(1);
	}
	const search = (q) && upperCase(q);

	const options = {
		endPoint: 'games',
		fields: 'name, cover.image_id, first_release_date',
		where: `name = *"${search}"*`,
		sort: 'name asc; sort aggregated_rating desc; sort id asc',
		limit: 500
	}
	const searchList = await useGameApi(options);

	// 검색결과 여부에 따른 전달값 조건문
	if (searchList.length) {
		return { props: { data: { success: true, searchList, result: 'yes' } } }
	} else {
		return { props: { data: { success: false, searchList: [], result: 'no' } } }
	}
}

