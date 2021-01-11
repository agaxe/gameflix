import React from 'react'

// * type
type ItemProps = {
	/** 클래스 명 */
	className?: string;
	/** children */
	children: React.ReactNode;
	/** 클릭 이벤트 */
	onClick?: (e?: any) => void;
}

//* component
/**
 * - `<li>` 태그를 사용한 Item 컴포넌트 입니다.
 */
function ItemComp({ className, children, onClick }: ItemProps) {
	return (
		<li
			className={className}
			onClick={onClick}
		>
			{children}
		</li>
	)
}
export default ItemComp

