import styled from 'styled-components';
import React from 'react'

// * type
type PageTitleProps = {
	children: React.ReactNode;
}

// * component
/**
 * - 페이지별로 표시되는 메인 타이틀 입니다.
 */
function PageTitle({ children }: PageTitleProps) {
	return (
		<>
			<h2>{children}</h2>
			<Line />
		</>
	)
}
export default PageTitle


// * style
// 타이틀 - 구분선
const Line = styled.span`
	display:block;
	width:100%;
	height:1px;
	background:#c4c4c4;
	margin-top:30px
`