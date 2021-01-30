import styled from 'styled-components';
import React from 'react'

// * type
type PageTitleProps = {
	/** 타이틀 텍스트 */
	title: string;
	/** 타이틀 아이콘 */
	children?: React.ReactNode;
}

// * component
/**
 * - 페이지별로 표시되는 메인 타이틀 입니다.
 */
function PageTitle({ title, children }: PageTitleProps) {
	return (
		<PageTitleBox>
			<h2>{title}</h2>
			<Line />
			{children &&
				<PageTitleIcons>
					{children}
				</PageTitleIcons>
			}
		</PageTitleBox>
	)
}
export default PageTitle


// * style

const PageTitleBox = styled.div`
	position:relative;
`
const Line = styled.span`
	display:block;
	width:100%;
	height:1px;
	background:#c4c4c4;
	margin-top:30px
`
const PageTitleIcons = styled.div`
	position:absolute;
	right:0;
	top:10px;
	svg{
		width:30px;
		height:30px;
		cursor:pointer;
	}
`