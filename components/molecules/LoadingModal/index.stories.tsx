import styled from 'styled-components';
import LoadingModal from './index';
import React, { useEffect } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

export default {
	title: 'component/molecules/LoadingModal',
	component: LoadingModal,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '페이지 로딩 모달 컴포넌트',
	}
}

export function loadingModal() {

	useEffect(() => {
		document.body.style.overflow = 'unset';
	}, [])

	return (
		<LoadingModalBox>
			<LoadingModalSB />
		</LoadingModalBox>
	)
}

const LoadingModalBox = styled.div`
	position:relative;
	height:500px;
`
const LoadingModalSB = styled(LoadingModal)`
	position:absolute;
`

loadingModal.story = {
	name: 'Default',
}





