import PageTitle from './index';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { MdViewList, MdViewModule, MdTune } from 'react-icons/md';

export default {
	title: 'component/molecules/PageTitle',
	component: PageTitle,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '페이지 타이틀 컴포넌트',
	}
}

export function pageTitle() {

	const title = text('title', '페이지 타이틀');
	const Icon = boolean('icon', false);

	return (
		<PageTitle title={title}>
			{Icon && <MdViewList />}
		</PageTitle>
	)
}

export const withIcon = () => (
	<PageTitle title='페이지 타이틀'>
		<MdViewList />
	</PageTitle>
)

pageTitle.story = {
	name: 'Default',
}





