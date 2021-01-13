import styled from 'styled-components';
import React, { useEffect, useState } from 'react'
import { List, Item } from 'components/atoms';
import { MdFirstPage, MdLastPage } from "react-icons/md";
import { useRouter } from 'next/router';
import { pxToRem } from 'static/styles/common';
import { VAR_COLOR } from 'static/styles/variable';
const { COLOR_PRIMARY } = VAR_COLOR;

// * type
type PaginationProps = {
	/** 데이터의 총 페이지 수 */
	length: number;
	/** 현재 페이지 값 */
	current: number;
}

// * component
function PaginationComp({ length, current }: PaginationProps) {

	const router = useRouter();
	const [MaxPageLength, setMaxPageLength] = useState(0)
	const CurrPage = current;

	useEffect(() => {
		if (CurrPage === length || length === 1) {
			setMaxPageLength(1)
		} else if (CurrPage === (length - 1)) {
			setMaxPageLength(2)
		} else {
			setMaxPageLength(3)
		}
	}, [CurrPage, length])

	// 페이지 넘버 클릭
	const PageIndexClick = (idx) => {
		router.push({
			query: {
				q: router.query.q,
				page: idx
			},
		}).then(() => window.scrollTo(0, 0));
	}

	// '첫 페이지' 클릭
	const PagePrevClick = () => {
		router.push({
			query: {
				q: router.query.q,
				page: 1
			},
		}).then(() => window.scrollTo(0, 0));

	}

	// '끝 페이지' 클릭
	const PageNextClick = () => {
		router.push({
			query: {
				q: router.query.q,
				page: length
			},
		}).then(() => window.scrollTo(0, 0));
	}

	return (
		<Pagination>
			<PaginationList>
				{CurrPage !== 1 && <PaginationItem onClick={PagePrevClick}><MdFirstPage /></PaginationItem>}
				{
					[...Array(MaxPageLength)].map((item, idx) => {
						const Number = CurrPage === 1 || CurrPage >= (length - 1)
							? CurrPage + idx
							: (CurrPage - 1) + idx
						return (
							<PaginationItem
								key={idx}
								onClick={() => PageIndexClick(Number)}
								css={{ "color": `${CurrPage === Number && COLOR_PRIMARY}` }}
							>
								{Number}
							</PaginationItem>
						)
					})
				}
				{CurrPage < length && <PaginationItem onClick={PageNextClick}><MdLastPage /></PaginationItem>}
			</PaginationList>
		</Pagination >
	)
}
export default PaginationComp

// * defaultProps
PaginationComp.defaultProps = {
	current: 1
}

// * style
const Pagination = styled.div`
	display:flex;
	justify-content:center;
`
const PaginationList = styled(List)`
	margin-top:20px;
	display:flex;
	align-items:center;
`
const PaginationItem = styled(Item)`
	margin:0 15px;
	font-size:${pxToRem(22)};
	cursor:pointer;
	svg{
		font-size:${pxToRem(19)};
	}
`
