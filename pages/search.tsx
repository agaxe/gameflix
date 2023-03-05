import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SearchPageTemp } from '@/components/templates';
import { SITE_KO_NAME } from '@/common/variables';
import { useGameApi } from '@/hooks/useGameApi';

// * type
type SearchPageProps = {
  data: any;
};

// * component
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

// * getServerSideProps
export async function getServerSideProps({ query }) {
  const { q } = query;

  // 검색어 앞글자 대문자로 변경
  function upperCase(search) {
    const keyWordArray = search.split(' ');
    const keyWord = String(
      keyWordArray.map(
        (item) =>
          (item = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
      )
    );

    return keyWord.replace(',', ' ');
  }
  const search = q && upperCase(q);

  const options = {
    endPoint: 'games',
    fields: 'name, cover.image_id, first_release_date',
    where: `name = *"${search}"*`,
    sort: 'name asc; sort aggregated_rating desc; sort id asc',
    limit: 500
  };

  const searchList = ((await useGameApi(options)) as any[]) || [];

  // 검색결과 여부에 따른 전달값 조건문
  if (searchList.length) {
    return { props: { data: { success: true, searchList, result: 'yes' } } };
  } else {
    return {
      props: { data: { success: false, searchList: [], result: 'no' } }
    };
  }
}
