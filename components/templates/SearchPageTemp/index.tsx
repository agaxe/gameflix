import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { MdViewList, MdViewModule } from 'react-icons/md';
import { Skeleton } from '@/components/atoms/Skeleton';
import { PageTitle } from '@/components/molecules/PageTitle';
import { Pagination } from '@/components/molecules/Pagination';
import { SearchList } from '@/components/organisms/SearchList';
import { ListType, SearchPageProps } from './interface';
import * as S from './styles';

export const SearchPageTemp = ({
  data = [],
  searchQuerySB = ''
}: SearchPageProps) => {
  const router = useRouter();
  const [listType, setListType] = useState<ListType>('LIST');
  const [currentPage, setCurrentPage] = useState(1);

  const searchQuery = useMemo(() => {
    const searchQuery =
      router.query && router.query.q && !searchQuerySB
        ? router.query.q
        : searchQuerySB;
    return searchQuery;
  }, [router, searchQuerySB]);

  const pagination = useMemo(() => {
    // 한 페이지에서 보여주려는 컨텐츠의 갯수
    const PostPerPage = 10;

    // 총 페이지 넘버값 ( 모든 컨텐츠 갯수 / 보여주려는 갯수 )
    const pageNumberList = data.searchList
      ? Math.ceil(data.searchList.length / PostPerPage)
      : 0;

    // 현재 페이지의 컨텐츠의 마지막 인덱스값
    const indexOfLastPost = currentPage * PostPerPage;

    // 현재 페이지의 컨텐츠의 첫번째 인덱스값
    const indexOfFirstPost = indexOfLastPost - PostPerPage;

    // 현재 보여주려는 포스트
    const currentPosts = data.searchList
      ? data.searchList.slice(indexOfFirstPost, indexOfLastPost)
      : [];

    return {
      pageNumberList,
      currentPosts
    };
  }, [data, currentPage]);

  useEffect(() => {
    if (router.pathname === '/search' && router.query.page) {
      setCurrentPage(Number(router.query.page));
    }
  }, [router]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <section>
      <PageTitle title='검색 결과'>
        <S.ListTypeBox type={listType}>
          <MdViewList onClick={() => setListType('LIST')} />
          <MdViewModule onClick={() => setListType('CARD')} />
        </S.ListTypeBox>
      </PageTitle>
      {'hasResult' in data ? (
        <>
          {data.hasResult ? (
            <S.PageTitleBottom>
              <div>
                <strong>'{searchQuery}'</strong> 에 대한
                <strong> {data.searchList.length.toLocaleString()}</strong> 개의
                게임을 검색했습니다!
              </div>
            </S.PageTitleBottom>
          ) : null}
        </>
      ) : (
        <S.PageTitleBottom>
          <Skeleton width={500} height={30} />
        </S.PageTitleBottom>
      )}
      <SearchList
        data={pagination.currentPosts}
        hasResult={data.hasResult}
        type={listType}
      />
      {pagination.pageNumberList !== 0 && (
        <Pagination length={pagination.pageNumberList} current={currentPage} />
      )}
    </section>
  );
};
