import styled from 'styled-components';
import React from 'react'

// * type
type ListProps = {
	flex?: boolean,
	align?: string,
	justify?: string,
	direction?: string,
	children: React.ReactNode,
	className?: string
}

// * component
/**
 * - `<ul>` 태그를 사용한 List 컴포넌트 입니다.
 * - display 값은 `flex` 값이 **true 면 이 flex** 이고 **false 면 block** 이 적용됩니다.
 * - `align`,`justify`,`direction` 값으로 flex 스타일을 지정할 수 있습니다.
 */
function ListComp({
	flex,
	align,
	justify,
	direction,
	children,
	className
}: ListProps) {
	return (
		<List
			flex={flex}
			align={align}
			justify={justify}
			direction={direction}
			className={className}
		>
			{children}
		</List>
	)
}
export default ListComp;

// * defaultProps
ListComp.defaultProps = {
	flex: true,
}

// * style
const List = styled.ul<ListProps>`
	display:${props => props.flex ? 'flex' : 'block'};
	align-items:${props => props.align};
	justify-content:${props => props.justify};
	flex-direction:${props => props.direction};
`