import { css } from 'styled-components';
import { VAR_SIZE } from './variable';
const { BASE_FONT_SIZE } = VAR_SIZE;

// 박스 ( 카드 ) 그림자 효과
export const STYLE_BOX_SHADOW = css`
	filter : drop-shadow(3px 3px 20px rgba(0, 0, 0, 0.25))
`;
// 텍스트 줄임 표시
export const STYLE_ELLIPSIS = css`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
// 폰트 사이즈 변환 ( px -> rem )
export const pxToRem = (px) => {
	return `${px / BASE_FONT_SIZE}rem`;
}