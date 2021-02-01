import React, { useState } from 'react';
import Select from './index';
import { withKnobs } from '@storybook/addon-knobs';

export default {
	title: 'component/atoms/Select',
	component: Select,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: 'Select 컴포넌트',
	}
};

export function select() {

	const Options = [
		{ title: '평점 높은 순', value: 'aggregated_rating-desc' },
		{ title: '평점 낮은 순', value: 'aggregated_rating-asc' },
		{ title: '발매일 최신 순', value: 'first_release_date-desc' },
		{ title: '발매일 오래된 순', value: 'first_release_date-asc' },
		{ title: '이름 순', value: 'name-asc' },
	]
	const [firstTitle, setFirstTitle] = useState(Options[0].title);

	const onClick = (e) => {
		const { name, value } = e.target.dataset;
		setFirstTitle(name);
	}

	return (
		<div css={{ 'height': '200px' }}>
			<Select
				width="150px"
				firstTitle={firstTitle}
				options={Options}
				onClick={onClick}
			/>
		</div>
	)
}

select.story = {
	name: 'Default'
}










