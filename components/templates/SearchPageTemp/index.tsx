import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MdViewList, MdViewModule } from 'react-icons/md';
import styled from 'styled-components';
import { Skeleton } from '@/components/atoms/Skeleton';
import { PageTitle } from '@/components/molecules/PageTitle';
import { Pagination } from '@/components/molecules/Pagination';
import { SearchList } from '@/components/organisms/SearchList';
import { PAGE_TITLE_BOTTOM } from '@/static/styles/common';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_GRAY } = VAR_COLOR;

// * type
type SearchPageProps = {
  /** 검색 결과 데이터 */
  data: any;
  /** 스토리북 테스트 검색어*/
  searchQuerySB?: string;
};

// * component
function SearchPageTemp({ data, searchQuerySB }: SearchPageProps) {
  const [ListType, setListType] = useState('list'); // list | card
  const router = useRouter();
  const searchQuery =
    router.query && router.query.q && !searchQuerySB
      ? router.query.q
      : searchQuerySB;

  // * 페이지 네이션
  // 현재 페이지
  const [CurrentPage, setCurrentPage] = useState(1);

  // 한 페이지에서 보여주려는 컨텐츠의 갯수
  const PostPerPage = 10;

  // 총 페이지 넘버값 ( 모든 컨텐츠 갯수 / 보여주려는 갯수 )
  const PageNumberList = data.searchList
    ? Math.ceil(data.searchList.length / PostPerPage)
    : 0;

  // 현재 페이지의 컨텐츠의 마지막 인덱스값
  const indexOfLastPost = CurrentPage * PostPerPage;

  // 현재 페이지의 컨텐츠의 첫번째 인덱스값
  const indexOfFirstPost = indexOfLastPost - PostPerPage;

  // 현재 보여주려는 포스트
  const currentPosts = data.searchList
    ? data.searchList.slice(indexOfFirstPost, indexOfLastPost)
    : [];

  useEffect(() => {
    if (router.pathname === '/search' && router.query.page) {
      setCurrentPage(Number(router.query.page));
    }
  }, [router]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // 리스트형 아이콘 클릭
  const ViewList_click = () => {
    setListType('list');
  };
  // 모듈형 아이콘 클릭
  const ViewModule_click = () => {
    setListType('card');
  };

  return (
    <section>
      <PageTitle title='검색 결과'>
        <ListTypeBox type={ListType}>
          <MdViewList onClick={ViewList_click} />
          <MdViewModule onClick={ViewModule_click} />
        </ListTypeBox>
      </PageTitle>
      {'result' in data && data.result === 'yes' ? (
        <>
          <PageTitleBottom>
            <div>
              <strong>'{searchQuery}'</strong> 에 대한
              <strong> {data.searchList.length.toLocaleString()}</strong> 개의
              게임을 검색했습니다!
            </div>
          </PageTitleBottom>
        </>
      ) : 'result' in data && data.result === 'no' ? null : (
        <PageTitleBottom>
          <Skeleton width={500} height={30} />
        </PageTitleBottom>
      )}
      <SearchList data={currentPosts} result={data.result} type={ListType} />
      {PageNumberList !== 0 && (
        <Pagination length={PageNumberList} current={CurrentPage} />
      )}
    </section>
  );
}
export default SearchPageTemp;

// * defaultProps
SearchPageTemp.defaultProps = {
  searchQuerySB: ''
};

// * style
const ListTypeBox = styled.div<{ type: string }>`
  svg {
    ${(props) =>
      props.type === 'card'
        ? `&:first-of-type{
				color:${COLOR_GRAY}	
			}`
        : `&:last-of-type{
				color:${COLOR_GRAY}	
			}`}
  }
`;
const PageTitleBottom = styled.div`
  ${PAGE_TITLE_BOTTOM};
`;
