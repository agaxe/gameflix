import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { DiscoverPageTemp } from '@/components/templates/DiscoverPageTemp';
import { Filters } from '@/components/templates/DiscoverPageTemp/interface';
import { SITE_KO_NAME } from '@/common/variables';
import { useGameApi } from '@/hooks/useGameApi';

// * type
type DiscoverPageProps = {
  genres: object[]; // 장르 리스트
};

// * component
function DiscoverPage({ genres = [] }: DiscoverPageProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({
    checkedGenres: [],
    releaseDate: [2016, new Date().getFullYear()],
    ratingScore: [30, 90],
    sortValue: ['aggregated_rating', 'desc']
  });
  const { checkedGenres, releaseDate, ratingScore, sortValue } = filters;

  const [resultData, setResultData] = useState({
    success: null,
    filterGameList: []
  });

  // 필터 검색
  const runFilterSearch = (filters: Filters) => {
    setFilters(filters);
    router.replace(router.asPath);
  };

  useEffect(() => {
    const filterToString = Object.entries(filters).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value.toString()
      }),
      {}
    );

    Axios.get(`/api/game/discover`, { params: filterToString })
      .then((res) => setResultData(res.data))
      .catch((err) => console.log(err));
  }, [filters, router]);

  return (
    <>
      <Head>
        <title>{` 탐색 | ${SITE_KO_NAME}`}</title>
      </Head>
      <DiscoverPageTemp
        data={resultData}
        genres={genres}
        checkedGenresData={checkedGenres}
        releaseDateData={releaseDate}
        ratingScoreData={ratingScore}
        sortValueData={sortValue}
        searchFunc={runFilterSearch}
      />
    </>
  );
}
export default DiscoverPage;

export async function getServerSideProps() {
  const options = {
    endPoint: 'genres',
    fields: 'name',
    sort: 'id asc',
    limit: 500
  };

  // return
  const genres = await useGameApi(options);
  return { props: { genres } };
}
