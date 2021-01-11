import { css } from "styled-components";
import { VAR_SIZE } from './variable';
const { BASE_FONT_SIZE, CONTENT_WIDTH, HEADER_HEIGHT } = VAR_SIZE;

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
			font-size:3.125rem; // 50px;
		}
		h2{
			font-size:2.625rem; // 42px;
		}
		h3{
			font-size:2.063rem; // 33px;
		}
		h4{
			font-size:1.5rem; // 24px;
		}
		p{
			font-size:1rem;
		}
	}
}
`
export default GlobalStyle;

