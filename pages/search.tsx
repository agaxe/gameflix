import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SearchPageTemp } from '@/components/templates/SearchPageTemp';
import { SITE_KO_NAME } from '@/common/variables';
import { useGameApi } from '@/hooks/useGameApi';
import { getPascalCaseString } from '@/utils/getPascalCaseString';

interface SearchPageProps {
  data: {
    searchList: object[];
    hasResult: boolean;
  };
}

function SearchPage({ data }: SearchPageProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          {router.query.q
            ? `'${router.query.q}' 검색 결과 | ${SITE_KO_NAME}`
            : '검색어가 없습니다.'}
        </title>
      </Head>
      <SearchPageTemp data={data} />
    </>
  );
}
export default SearchPage;

export async function getServerSideProps({ query }) {
  const { q } = query;
  const search = q && getPascalCaseString(q);

  const options = {
    endPoint: 'games',
    fields: 'name, cover.image_id, first_release_date',
    where: `name = *"${search}"*`,
    sort: 'name asc; sort aggregated_rating desc; sort id asc',
    limit: 500
  };

  const searchList = ((await useGameApi(options)) as any[]) || [];

  // 검색결과 여부에 따른 전달값 조건문
  return {
    props: {
      data: { searchList, hasResult: Boolean(searchList.length) }
    }
  };
}
