import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from '@tanstack/react-query';
import Axios from 'axios';
import { DiscoverPageTemp } from '@/components/templates/DiscoverPageTemp';
import { Filters } from '@/components/templates/DiscoverPageTemp/interface';
import { SITE_KO_NAME } from '@/common/variables';
import { useGameApi } from '@/hooks/useGameApi';
import { DiscoverPageProps, GameData } from '@/shared/types/pages/discover';

function DiscoverPage({ genres = [] }: DiscoverPageProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({
    checkedGenres: [],
    releaseDate: [2016, new Date().getFullYear()],
    ratingScore: [30, 90],
    sortValue: ['aggregated_rating', 'desc']
  });
  const { checkedGenres, releaseDate, ratingScore, sortValue } = filters;

  const filtersStringValue = useMemo(() => {
    const filterToString = Object.entries(filters).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value.toString()
      }),
      {}
    );
    return filterToString;
  }, [filters]);

  const { fetchNextPage, data } = useInfiniteQuery({
    queryKey: ['discover', Object.values(filtersStringValue).toString()],
    queryFn: async ({ pageParam = 1 }): Promise<GameData> => {
      return await Axios.get(`/api/game/discover`, {
        params: {
          ...filtersStringValue,
          page: pageParam
        }
      }).then((res) => res.data);
    },
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    refetchOnWindowFocus: false
  });

  // 필터 검색
  const runFilterSearch = (filters: Filters) => {
    setFilters(filters);
    router.replace(router.asPath);
  };

  return (
    <>
      <Head>
        <title>{` 탐색 | ${SITE_KO_NAME}`}</title>
      </Head>
      <DiscoverPageTemp
        data={data}
        genres={genres}
        checkedGenresData={checkedGenres}
        releaseDateData={releaseDate}
        ratingScoreData={ratingScore}
        sortValueData={sortValue}
        searchFunc={runFilterSearch}
        fetchNextPage={fetchNextPage}
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

  const genres = await useGameApi(options);
  return { props: { genres } };
}
