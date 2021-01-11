import SearchList from './index';
import { withKnobs, select } from '@storybook/addon-knobs';
import { VAR_SIZE } from 'static/styles/variable';
const { CONTENT_WIDTH } = VAR_SIZE;

export default {
	title: 'component/organisms/SearchList',
	component: SearchList,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '게임 검색결과 리스트 컴포넌트',
	}
};

const data = [...Array(5)].map(item => (
	{
		cover: { image_id: 'co1rcb' },
		name: 'overwatch',
		first_release_date: 1464048000
	}
))

export function searchList() {

	const type = select(
		'type',
		['list', 'card'],
		'list'
	);
	const result = select(
		'result',
		['yes', 'no'],
		'yes'
	);

	return (
		<div
			css={{ 'width': CONTENT_WIDTH }}
		>
			<SearchList
				data={data}
				type={type}
				result={result}
			/>
		</div>
	)
}

searchList.story = {
	name: 'Default',
}

export const ListType = () => (<SearchList data={data} type='list' result='yes' />)
export const CardType = () => (<SearchList data={data} type='card' result='yes' />)
export const NotResult = () => (<SearchList data={[]} type='list' result='no' />)





