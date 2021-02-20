import { css } from 'styled-components';
import { VAR_SIZE, VAR_COLOR } from './variable';
const { BASE_FONT_SIZE } = VAR_SIZE;
const { COLOR_PRIMARY } = VAR_COLOR

// 박스 ( 카드 ) 그림자 효과
export const STYLE_BOX_SHADOW = css`
	filter : drop-shadow(3px 3px 20px rgba(0, 0, 0, 0.25))
`;
// 텍스트 줄임 표시
export const STYLE_ELLIPSIS = css`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	line-height:1.4;
	display:block;
`;
// 폰트 사이즈 변환 ( px -> rem )
export const pxToRem = (px) => {
	return `${px / BASE_FONT_SIZE}rem`;
}
// 페이지 타이틀 하단 영역
export const PAGE_TITLE_BOTTOM = css`
	position:relative;
	display:flex;
	justify-content:space-between;
	padding:35px 0;
	& > *:first-of-type{
		font-size:${pxToRem(30)};
		word-break: keep-all;
		line-height:1.2;
		& > strong{
			color:${COLOR_PRIMARY};
		}
	}
`