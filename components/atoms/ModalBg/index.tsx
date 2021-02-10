import styled from 'styled-components';
import React from 'react'

// * type
type ModalBgProps = {
	/** 상태값 */
	state: boolean;
	/** click 이벤트 */
	onClick?: () => void;
	/** 클래스 명 */
	className?: string;
	/** display css 값 */
	display?: string;
	/** z-index css 값 */
	zIndex?: number;
	/** children */
	children?: React.ReactNode;
}

// * component
/**
 * - 모달에 사용되는 background 컴포넌트 입니다.
 */
function ModalBgComp({ state, onClick, className, display, zIndex, children }: ModalBgProps) {
	return (
		<ModalBg
			state={state}
			className={className}
			onClick={onClick}
			css={{ 'z-index': `${zIndex}` }}
			display={display}
		>
			{children}
		</ModalBg>
	)
}
export default ModalBgComp;

// * defaultProps
ModalBgComp.defaultProps = {
	zIndex: 100,
	display: 'block'
}

// * style
const ModalBg = styled.div<{ state: boolean, display: string }>`
	display:${props => props.state ? props.display : 'none'};
	position:fixed;
	top:0;
	left:0;
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.8);
`;

