import styled from 'styled-components';
import React from 'react'

// * type
type NoResultProps = {
	title: string;
}

// * component
function NoResultComp({ title }: NoResultProps) {
	return (
		<NoResult>
			<h4>{title}결과가 없습니다 :(</h4>
		</NoResult>
	)
}
export default NoResultComp;

// * style
const NoResult = styled.div`
	width:100%;
	text-align:center;
	display:flex;
	justify-content:center;
	align-items:center;
	min-height:400px;
	color:#cacaca;
`;

