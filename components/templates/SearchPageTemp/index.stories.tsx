import SearchPageTemp from './index';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import dummyData from '.storybook/dummyData.json';

export default {
	title: 'component/templates/SearchPageTemp',
	component: SearchPageTemp,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '검색결과 페이지 템플릿 컴포넌트',
	}
}

export function searchPageTemp() {

	const dummyGames = dummyData.games;

	const data = boolean('검색결과 데이터', true);
	const searchResult = boolean('검색결과 여부', true);
	const searchQuery = text('검색어', '오버워치');

	const searchList = searchResult
		? [...Array(5)].map(item => (
			{
				cover: dummyGames.cover,
				name: dummyGames.name,
				first_release_date: dummyGames.first_release_date
			}
		))
		: null

	const result = searchResult ? 'yes' : 'no';

	const searchListData = {
		searchList,
		result
	}

	return (
		<SearchPageTemp
			data={data ? searchListData : {}}
			searchQuerySB={searchQuery}
		/>
	)
}

searchPageTemp.story = {
	name: 'Default',
}








