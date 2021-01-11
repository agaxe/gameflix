import ErrorPageTemp from './index';
import { withKnobs, number } from '@storybook/addon-knobs';

export default {
	title: 'component/templates/ErrorPageTemp',
	component: ErrorPageTemp,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '에러 페이지 템플릿 컴포넌트',
	}
}

export function errorPageTemp() {

	const statusCode = number('statusCode', 404);

	return (
		<div css={{ 'height': '300px' }}>
			<ErrorPageTemp statusCode={statusCode} />
		</div>
	)
}

errorPageTemp.story = {
	name: 'Default',
}








