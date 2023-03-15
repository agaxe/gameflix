import React, { useEffect, useRef, useState } from 'react';
import { MdTune } from 'react-icons/md';
import { CheckBox } from '@/components/atoms/CheckBox';
import { List } from '@/components/atoms/List';
import { ModalBg } from '@/components/atoms/ModalBg';
import { NoResult } from '@/components/atoms/NoResult';
import { Skeleton } from '@/components/atoms/Skeleton';
import { GameCard } from '@/components/molecules/GameCard';
import { PageTitle } from '@/components/molecules/PageTitle';
import { RangeSlider } from '@/components/molecules/RangeSlider';
import { NO_COVER_IMAGE } from '@/common/variables';
import { sortValues } from './data';
import { DiscoverPageTempProps, Filters } from './interface';
import * as S from './styles';

/**
 * - 게임들을 여러 조건로 탐색할 수 있는 탐색 페이지 입니다.
 * - 우측의 필터 아이콘을 클릭하면 게임들을 여러 조건으로 검색할 수 있는 메뉴가 생성됩니다.
 * - 탐색결과의 게임 갯수가 특정 수를 넘어가면 무한 스크롤링이 되도록 구현하였습니다.
 */
export const DiscoverPageTemp = ({
  data,
  genres,
  checkedGenresData,
  releaseDateData,
  ratingScoreData,
  sortValueData,
  searchFunc,
  fetchNextPage
}: DiscoverPageTempProps) => {
  const isChecked = useRef(false);
  const gameListRef = useRef(null);
  const [filterMenuState, setFilterMenuState] = useState(false);
  const [sortFirstTitle, setSortFirstTitle] = useState(sortValues[0].title);
  const [filters, setFilters] = useState<Filters>({
    checkedGenres: checkedGenresData,
    releaseDate: releaseDateData,
    ratingScore: ratingScoreData,
    sortValue: sortValueData
  });
  const { releaseDate, ratingScore } = filters;

  // 장르 선택(체크) 이벤트
  const handleClickGenreCheckBox = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const { name, checked } = e.target as HTMLInputElement;

    const getCheckedGenres = (prev: Filters) => {
      const checkedGenres = [...prev.checkedGenres, name];
      return !checked
        ? checkedGenres.filter((item) => item !== name)
        : checkedGenres;
    };

    setFilters(
      (prev) =>
        ({
          ...prev,
          checkedGenres: getCheckedGenres(prev)
        } as Filters)
    );
  };

  // 필터 검색버튼 클릭
  const runfilterSearch = () => {
    searchFunc(filters);
    window.scrollTo(0, 0);
    setFilterMenuState(false);
  };

  useEffect(() => {
    // 필터 결과 리스트 이벤트
    const listScroll = () => {
      if (gameListRef.current) {
        const { clientHeight, offsetTop } = gameListRef.current;
        const { scrollTop } = document.documentElement;
        const windowHeight = window.innerHeight;

        if (
          isChecked.current === false &&
          clientHeight + offsetTop - windowHeight <= scrollTop
        ) {
          fetchNextPage();
          isChecked.current = true;
          return;
        }

        isChecked.current = false;
      }
    };

    window.addEventListener('scroll', listScroll);
    return () => {
      window.removeEventListener('scroll', listScroll);
    };
  }, []);

  useEffect(() => {
    if (filterMenuState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [filterMenuState]);

  // select option 선택
  const onClickSelectOption = (e) => {
    const { name, value } = e.target.dataset;
    const sortValueInfo = { sortValue: value.split('-') };

    const filterInfo = {
      ...filters,
      ...sortValueInfo
    };

    setSortFirstTitle(name);
    setFilters(filterInfo);
    searchFunc(filterInfo);
  };

  const success = data?.pages[0].success;
  const count = data?.pages[0].count;

  return (
    <section>
      <PageTitle title='탐색'>
        <MdTune onClick={() => setFilterMenuState(true)} />
      </PageTitle>
      {data?.pages.length ? (
        <>
          <S.PageTitleBottom>
            <div>
              총 <strong>{count.toLocaleString()}</strong> 개의 게임을
              발견했습니다!
            </div>
            <S.DiscoverSelect
              width='150px'
              firstTitle={sortFirstTitle}
              onClick={onClickSelectOption}
              options={sortValues}
            />
          </S.PageTitleBottom>
          <div ref={gameListRef}>
            <S.GameList justify='flex-start'>
              {data.pages.map((item, idx) =>
                item.games.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <GameCard
                      id={item.id}
                      key={idx}
                      cover={item?.cover?.image_id || NO_COVER_IMAGE}
                      name={item.name}
                      rating={item.aggregated_rating}
                    />
                  </React.Fragment>
                ))
              )}
            </S.GameList>
          </div>
        </>
      ) : success && !data.pages.length ? (
        <NoResult title='탐색' />
      ) : (
        <>
          <S.PageTitleBottom>
            <Skeleton width={500} height={30} />
            <Skeleton width={140} height={30} />
          </S.PageTitleBottom>
          <S.GameList>
            {[...Array(20)].map((item, idx) => (
              <React.Fragment key={idx}>
                <GameCard skeleton />
              </React.Fragment>
            ))}
          </S.GameList>
        </>
      )}
      <>
        <ModalBg
          state={filterMenuState}
          onClick={() => setFilterMenuState(false)}
        />
        <S.FilterMenuBox state={filterMenuState}>
          <S.FilterMenuCloseBtn onClick={() => setFilterMenuState(false)} />
          <S.FilterMenu>
            <div>
              <S.FilterMenuContent>
                <S.FilterMenuTitle>장르</S.FilterMenuTitle>
                <List direction='column'>
                  {genres.map((item: any, idx) => (
                    <React.Fragment key={idx}>
                      <S.FilterMenuItem>
                        <S.FilterMenuLabel htmlFor={item.name}>
                          {item.name}
                        </S.FilterMenuLabel>
                        <CheckBox
                          id={item.name}
                          name={item.id}
                          onClick={handleClickGenreCheckBox}
                        />
                      </S.FilterMenuItem>
                    </React.Fragment>
                  ))}
                </List>
              </S.FilterMenuContent>
              <S.FilterMenuContent>
                <S.FilterMenuTitle>발매일</S.FilterMenuTitle>
                <RangeSlider
                  firstValue={releaseDate[0]}
                  lastValue={releaseDate[1]}
                  minRange={1970}
                  maxRange={2021}
                  setValue={(newValue) =>
                    setFilters((prev) => ({
                      ...prev,
                      releaseDate: newValue
                    }))
                  }
                  hasLabel={true}
                />
              </S.FilterMenuContent>
              <S.FilterMenuContent>
                <S.FilterMenuTitle>평점</S.FilterMenuTitle>
                <RangeSlider
                  firstValue={ratingScore[0]}
                  lastValue={ratingScore[1]}
                  setValue={(newValue) =>
                    setFilters((prev) => ({
                      ...prev,
                      ratingScore: newValue
                    }))
                  }
                  hasLabel={true}
                />
              </S.FilterMenuContent>
              <S.FilterSearchBtn onClick={runfilterSearch}>
                검색
              </S.FilterSearchBtn>
            </div>
          </S.FilterMenu>
        </S.FilterMenuBox>
      </>
    </section>
  );
};
