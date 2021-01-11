import GameList from './index';
import { withKnobs } from '@storybook/addon-knobs';
import { VAR_SIZE } from 'static/styles/variable';
const { CONTENT_WIDTH } = VAR_SIZE;

export default {
	title: 'component/organisms/GameList',
	component: GameList,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '게임 카드 리스트 컴포넌트',
	}
};

export function gameList() {

	const data = [...Array(5)].map(item => (
		{
			cover: { image_id: 'co1rcb' },
			name: 'overwatch',
			aggregated_rating: 80
		}
	))

	return (
		<GameList
			data={data}
			css={{ 'width': `${CONTENT_WIDTH}` }}
		/>
	)
}

gameList.story = {
	name: 'Default',
}






