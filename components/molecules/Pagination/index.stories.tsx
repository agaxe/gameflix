import Pagenation from './index';
import { withKnobs, number } from '@storybook/addon-knobs';

export default {
	title: 'component/molecules/Pagenation',
	component: Pagenation,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '페이지 네이션 컴포넌트',
	}
}

export function pagenation() {

	const length = number('length', 5);

	return (
		<Pagenation
			length={length}
		/>
	)
}

pagenation.story = {
	name: 'Default',
}





