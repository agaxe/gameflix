import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router'
import { Input } from 'components/atoms';
import { MdSearch } from 'react-icons/md';
import { VAR_COLOR } from 'static/styles/variable';
const { COLOR_WHITE } = VAR_COLOR;

// * type
type SearchInputProps = {
	className?: string;
	/** SearchInput 클릭 이벤트 */
	onClick?: (word: string) => void;
}

// * component
/**
 * - `onClick` 값으로 input 값을 검색합니다.
 */
function SearchInputComp({ className, onClick }: SearchInputProps) {

	const router = useRouter();

	// 검색어 단어 ( query ) 
	const [Search, setSearch] = useState<string>('');

	// 현재 페이지가 search 가 아니면 검색input의 value를 초기화
	useEffect(() => {
		const pathname = router.pathname;
		const query = (pathname === '/search' && router.query && router.query.q) ? router.query.q : '';

		setSearch(`${query}`)
	}, [router.pathname])

	// InputChange
	const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearch(value);
	}
	// enter 키로 검색
	const SearchEnterKey = (e) => {
		e.key === 'Enter' && onClick(Search);
	}

	return (
		<SearchInputBox className={className}>
			<SearchInput
				name="search"
				value={Search}
				placeholder="검색"
				onChange={InputChange}
				onKeyPress={SearchEnterKey}
			/>
			<SearchBtn onClick={() => onClick(Search)}>
				<MdSearch />
			</SearchBtn>
		</SearchInputBox>
	)
}
export default SearchInputComp

// * style
// 검색 input 박스
const SearchInputBox = styled.div`
	position:relative;
	width:300px;
`
// 검색 버튼
const SearchBtn = styled.span`
	position:absolute;
	height:100%;
	right:0px;
	top:50%;
	transform:translate(0%, -50%);
	color:${COLOR_WHITE};
	box-sizing:border-box;
	padding:0 10px;
	display:flex;
	align-items:center;
	justify-content:center;
	color:#595959;
	cursor:pointer;
`
// 검색 input
const SearchInput = styled(Input)`
	width:100%;
	padding-right:45px;
`

