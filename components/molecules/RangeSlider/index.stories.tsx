import React, { useState } from 'react';
import RangeSlider from './index';
import { withKnobs, boolean } from '@storybook/addon-knobs';

export default {
	title: 'component/molecules/RangeSlider',
	component: RangeSlider,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: 'RangeSlider 타이틀 컴포넌트',
	}
}

export function rangeSlider() {

	const [value, setValue] = useState([30, 70]);

	const onChange = (newValue) => {
		setValue(newValue)
	}

	const label = boolean('label', false);

	return (
		<RangeSlider
			width='300px'
			firstValue={value[0]}
			lastValue={value[1]}
			setValue={onChange}
			label={label}
		/>
	)
}

rangeSlider.story = {
	name: 'Default'
}

export const Label = () => {

	const [value, setValue] = useState([30, 70]);

	const onChange = (newValue) => {
		setValue(newValue)
	}

	return (
		<RangeSlider
			width='300px'
			firstValue={value[0]}
			lastValue={value[1]}
			setValue={onChange}
			label={true}
		/>
	)
}
