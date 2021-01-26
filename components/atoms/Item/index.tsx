import React from 'react'

// * type
type ItemProps = {
	/** 클래스 명 */
	className?: string;
	/** children */
	children: React.ReactNode;
	/** 클릭 이벤트 */
	onClick?: (e?: any) => void;
	/** data name*/
	dataName?: string | number;
	/** data value */
	dataValue?: string | number;
}

//* component
/**
 * - `<li>` 태그를 사용한 Item 컴포넌트 입니다.
 */
function ItemComp({ className, children, onClick, dataName, dataValue }: ItemProps) {
	return (
		<li
			data-name={dataName}
			data-value={dataValue}
			className={className}
			onClick={onClick}
		>
			{children}
		</li>
	)
}
export default ItemComp

