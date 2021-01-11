import styled from 'styled-components';
import LoadingPopup from './index';
import React, { useEffect } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

export default {
	title: 'component/molecules/LoadingPopup',
	component: LoadingPopup,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '페이지 로딩 팝업 컴포넌트',
	}
}

export function loadingPopup() {

	useEffect(() => {
		document.body.style.overflow = 'unset';
	}, [])

	return (
		<LoadingPopupBox>
			<LoadingPopupSB />
		</LoadingPopupBox>
	)
}

const LoadingPopupBox = styled.div`
	position:relative;
	height:500px;
`
const LoadingPopupSB = styled(LoadingPopup)`
	position:absolute;
`

loadingPopup.story = {
	name: 'Default',
}





