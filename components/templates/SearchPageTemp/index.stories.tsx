import SearchPageTemp from './index';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

export default {
	title: 'component/templates/SearchPageTemp',
	component: SearchPageTemp,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '검색결과 페이지 템플릿 컴포넌트',
	}
}

export function searchPageTemp() {

	const SearchListData = {
		SearchList: [...Array(5)].map(item => (
			{
				cover: { image_id: 'co1rcb' },
				name: 'overwatch',
				first_release_date: 1464048000
			}
		)),
		result: 'yes',
	}

	const data = boolean('검색결과 데이터', true);
	const searchQuery = text('검색어', '오버워치');

	return (
		<SearchPageTemp
			data={data ? SearchListData : {}}
			searchQuerySB={searchQuery}
		/>
	)
}

searchPageTemp.story = {
	name: 'Default',
}








