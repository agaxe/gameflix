import styled, { css } from 'styled-components';
import React, { useState, useEffect } from 'react'
import { MdArrowDropDown } from 'react-icons/md';
import { List, Item } from 'components/atoms';
import { VAR_COLOR } from 'static/styles/variable'
import { pxToRem } from 'static/styles/common';
const { COLOR_WHITE, COLOR_LINE_GRAY, COLOR_GRAY } = VAR_COLOR;

// * type
type SelectType = {
	/** 넓이값  */
	width: string;
	/** 초기값 타이틀 */
	firstTitle: string;
	/** option 리스트  */
	options: any[];
	/** 클릭 이벤트  */
	onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

// * component
/**
 * - custom style 을 위해 `<div>` 로 제작한 select 입니다.
 */
function SelectComp({ width, firstTitle, options, onClick }: SelectType) {

	const [selectItemState, setSelectItemState] = useState(false);

	const activeSelectOption = (e) => {
		setSelectItemState(false);
		onClick(e);
	}

	const toggleSelectOption = () => {
		setSelectItemState(false)
	}

	useEffect(() => {
		if (selectItemState) {
			document.addEventListener('click', toggleSelectOption)
			return () => {
				document.removeEventListener('click', toggleSelectOption)
			};
		}
	}, [selectItemState])

	return (
		<SelectBox width={width}>
			<SelectTitle onClick={() => setSelectItemState(!selectItemState)}>
				{firstTitle}
				<MdArrowDropDown />
			</SelectTitle>
			{
				selectItemState &&
				<SelectList direction="column">
					{options && options.map((item, idx) => (
						<React.Fragment key={idx}>
							<SelectItem onClick={activeSelectOption} dataName={item.title} dataValue={item.value}>
								{item.title}
							</SelectItem>
						</React.Fragment>
					))}
				</SelectList>
			}
		</SelectBox>
	)
}
export default SelectComp;

// * style
const selectBorder = css`
	border:1px solid ${COLOR_LINE_GRAY};
`
const selectPadding = css`
	padding: 10px;
`
const SelectBox = styled.div<{ width: string }>`
	background:${COLOR_WHITE};
	width:${props => props.width};
	color:#666;
	cursor:default;
	font-size:${pxToRem(14)};
	user-select: none;
`
const SelectTitle = styled.div`
	display:flex;
	align-items:center;
	justify-content:space-between;
	box-sizing:border-box;
	border:1px solid transparent;
	transition:border 0.3s;
	${selectPadding}
	&:hover{
		${selectBorder}
	}
	svg{
		margin-left:5px;
		font-size:20px;
	}
`
const SelectList = styled(List)`
	margin-top:-1px;
	${selectBorder}
	box-sizing:border-box;
`
const SelectItem = styled(Item)`
	${selectPadding}
	&:hover{
		background:${COLOR_GRAY}
	}
`
