import PageTitle from './index';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
	title: 'component/molecules/PageTitle',
	component: PageTitle,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '페이지 타이틀 컴포넌트',
	}
}

export function pageTitle() {
	const children = text('chliren', '검색 결과')
	return (
		<PageTitle>{children}</PageTitle>
	)
}

pageTitle.story = {
	name: 'Default',
}





