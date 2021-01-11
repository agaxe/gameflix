import styled from 'styled-components';
import MainVisual from './index';
import { withKnobs } from '@storybook/addon-knobs';
import { VAR_SIZE } from 'static/styles/variable';
const { CONTENT_WIDTH } = VAR_SIZE;

export default {
	title: 'component/molecules/MainVisual',
	component: MainVisual,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '메인 비주얼 컴포넌트',
	}
}

export function mainVisaul() {

	const data = [...Array(5)].map(item => (
		{
			name: 'overwatch',
			screenshots: [{ image_id: 'qix3yskantk4uj0to7xm' }],
			first_release_date: 1464048000
		}
	))

	return (
		<MainVisualSB
			ComingSoonData={data}
		/>
	)
}

const MainVisualSB = styled(MainVisual)`
	min-width:${CONTENT_WIDTH};
`

mainVisaul.story = {
	name: 'Default',
}





