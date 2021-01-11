import { css } from "styled-components";
import { VAR_SIZE } from './variable';
const { BASE_FONT_SIZE, CONTENT_WIDTH, HEADER_HEIGHT } = VAR_SIZE;
import { pxToRem } from 'static/styles/common';

const GlobalStyle = css`
html{
	font-size:${BASE_FONT_SIZE}px;
	body{
		padding-top:${HEADER_HEIGHT};
		font-family: 'Noto Sans KR', sans-serif;
		// ? section 영역 - 공통 넓이 설정
		section{
			margin:0 auto;
			width:${CONTENT_WIDTH};
			padding:65px 0;
		}
		// ? heading & p 태그
		h1{
			font-size:${pxToRem(50)};
		}
		h2{
			font-size:${pxToRem(42)};
		}
		h3{
			font-size:${pxToRem(33)};
		}
		h4{
			font-size:${pxToRem(24)};
		}
		p{
			font-size:1rem;
		}
	}
}
`
export default GlobalStyle;

