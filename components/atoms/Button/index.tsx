import styled, { css } from 'styled-components';
import { VAR_COLOR } from 'static/styles/variable';
const { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_TERTIARY, COLOR_WHITE } = VAR_COLOR;

// * type
type ButtonType = {
	/** 버튼의 텍스트 */
	children: React.ReactNode;
	/** 클래스 명 */
	className?: string;
	/** 버튼의 테마 색상 */
	theme: "primary" | "secondary" | "tertiary";
	/** 버튼 활성화  */
	disabled: boolean;
	/** 버튼 클릭 이벤트 */
	onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
	/** 버튼 타입 */
	type: "button" | "reset" | "submit";
}

// * component
/**
 * - `theme` 으로 테마 색상을 적용시킵니다.
 * - `onClick` 으로 클릭 이벤트를 적용시킵니다.
 */
function ButtonComp({
	type,
	children,
	className,
	disabled,
	theme,
	onClick,
}: ButtonType) {
	return (
		<Button
			type={type}
			className={className}
			css={[themes[theme]]}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</Button>
	)
}
export default ButtonComp

// * defaultProps
ButtonComp.defaultProps = {
	type: 'button',
	disabled: false,
	theme: 'primary'
};

// * style
// 버튼 기본 스타일 
const Button = styled.button`
	font-size: 1rem;
	padding: 1rem;
	outline: none;
	border: none;
	box-sizing: border-box;
	border-radius: 0.25rem;
	line-height: 1;
	font-weight: 600;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	&:focus {
		box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
	}
	&:disabled {
		cursor: not-allowed;
	}
`
// 버튼 - 테마
const themes = {
	primary: css`
		background: ${COLOR_PRIMARY};
		color: ${COLOR_WHITE};
		&:enabled:hover {
			background: #D04D4D;
		}
		&:enabled:active {
			background: ${COLOR_PRIMARY};
		}
		&:disabled {
			background: #d17676;
		}
	`,
	secondary: css`
		background: ${COLOR_SECONDARY};
		color: ${COLOR_WHITE};
		&:enabled:hover  {
			background: rgba(0,0,0,0.8);
		}
		&:enabled:active {
			background: ${COLOR_SECONDARY};
		}
		&:disabled {
			background: #4b4b4b;
		}
	`,
	tertiary: css`
		background:none;
		color: ${COLOR_PRIMARY};
		&:enabled:hover  {
			background: ${COLOR_TERTIARY};
		}
		&:enabled:active {
			background: none;
		}
	`,
}

