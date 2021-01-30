import styled from 'styled-components';
import React, { useState, useEffect } from 'react'
import { SearchList } from 'components/organisms';
import { PageTitle, Pagination } from 'components/molecules';
import { MdViewList, MdViewModule } from 'react-icons/md';
import { useRouter } from 'next/router';
import { VAR_COLOR } from 'static/styles/variable';
const { COLOR_GRAY } = VAR_COLOR;

// * type
type SearchPageProps = {
	/** 검색 결과 데이터 */
	data: any
}

// * component
function SearchPageTemp({ data }: SearchPageProps) {

	const [ListType, setListType] = useState('list'); // list | card
	const router = useRouter();
	const searchQuery = (router.query && router.query.q) ? router.query.q : '';

	// * 페이지 네이션
	// 현재 페이지
	const [CurrentPage, setCurrentPage] = useState(1);

	// 한 페이지에서 보여주려는 컨텐츠의 갯수
	const PostPerPage = 10;

	// 총 페이지 넘버값 ( 모든 컨텐츠 갯수 / 보여주려는 갯수 )
	const PageNumberList = data.SearchList ? Math.ceil(data.SearchList.length / PostPerPage) : 0;

	// 현재 페이지의 컨텐츠의 마지막 인덱스값
	const indexOfLastPost = CurrentPage * PostPerPage;

	// 현재 페이지의 컨텐츠의 첫번째 인덱스값
	const indexOfFirstPost = indexOfLastPost - PostPerPage;

	// 현재 보여주려는 포스트
	const currentPosts = data.SearchList ? data.SearchList.slice(indexOfFirstPost, indexOfLastPost) : [];

	useEffect(() => {
		if (router.pathname === '/search' && router.query.page) {
			setCurrentPage(Number(router.query.page));
		}
	}, [router.query])

	useEffect(() => {
		setCurrentPage(1)
	}, [searchQuery])

	// 리스트형 아이콘 클릭
	const ViewList_click = () => {
		setListType('list')
	}
	// 모듈형 아이콘 클릭
	const ViewModule_click = () => {
		setListType('card')
	}

	return (
		<section>
			<PageTitle title="검색 결과">
				<ListTypeBox type={ListType}>
					<MdViewList onClick={ViewList_click} />
					<MdViewModule onClick={ViewModule_click} />
				</ListTypeBox>
			</PageTitle>
			<SearchList
				data={currentPosts}
				result={data.result}
				type={ListType}
			/>
			{PageNumberList !== 0 &&
				<Pagination
					length={PageNumberList}
					current={CurrentPage}
				/>
			}
		</section>
	)
}
export default SearchPageTemp

// * style
const ListTypeBox = styled.div<{ type: string }>`
	svg{
		${props => (props.type === 'card')
		? `&:first-of-type{
				color:${COLOR_GRAY}	
			}`
		: `&:last-of-type{
				color:${COLOR_GRAY}	
			}`
	}
	}
`