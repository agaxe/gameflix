import styled from 'styled-components';
import MainVisual from './index';
import { withKnobs } from '@storybook/addon-knobs';
import { VAR_SIZE } from 'static/styles/variable';
const { CONTENT_WIDTH } = VAR_SIZE;
import dummyData from '.storybook/dummyData.json';

export default {
	title: 'component/molecules/MainVisual',
	component: MainVisual,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '메인 비주얼 컴포넌트',
	}
}

export function mainVisaul() {

	const dummyGames = dummyData.games;

	const data = [...Array(5)].map(item => (
		{
			name: dummyGames.name,
			screenshots: dummyGames.screenshots,
			first_release_date: dummyGames.first_release_date
		}
	))

	return (
		<MainVisualSB
			comingSoonData={data}
		/>
	)
}

const MainVisualSB = styled(MainVisual)`
	min-width:${CONTENT_WIDTH};
`

mainVisaul.story = {
	name: 'Default',
}





