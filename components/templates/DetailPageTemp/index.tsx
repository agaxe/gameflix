import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight, MdPlayArrow } from 'react-icons/md';
import SwiperCore, { Navigation } from 'swiper';
import { SwiperSlide } from 'swiper/react';
import { List } from '@/components/atoms/List';
import { GameCard } from '@/components/molecules/GameCard';
import { SectionTitle } from '@/components/molecules/SectionTitle';
import { DeatailAgeRating } from '@/components/organisms/Detail/AgeRating';
import { DetailInformation } from '@/components/organisms/Detail/Information';
import { DetailSummary } from '@/components/organisms/Detail/Summary';
import { DetailWebSite } from '@/components/organisms/Detail/WebSite';
import { GameList } from '@/components/organisms/GameList';
import { IGDB_COVER_URL, NO_COVER_IMAGE } from '@/common/variables';
import { getUnixTimeStampToDate } from '@/utils/getUnixTimeStampToDate';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { tabMenuTitles } from './data';
import { DetailPageProps } from './interface';
import * as S from './styles';

SwiperCore.use([Navigation]);

export const DetailPageTemp = ({
  detailData,
  similarGameData,
  recentGamesData
}: DetailPageProps) => {
  const [currentTabMenu, setCurrentTabMenu] = useState(1);
  const [summaryMore, setSummaryMore] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [currentModalIdx, setCurrentModalIdx] = useState(0);

  const {
    name,
    cover,
    first_release_date,
    aggregated_rating,
    summary,
    involved_companies,
    genres,
    platforms,
    age_ratings,
    websites,
    screenshots,
    videos
  } = detailData;

  //게임 정보
  const coverImg = cover?.image_id || NO_COVER_IMAGE;

  const timeStampToDate = (timeStamp: number) => {
    if (timeStamp) {
      return getUnixTimeStampToDate(timeStamp, 'yyyy년 MM월 d일 출시');
    }

    return '출시일 정보 없음';
  };

  const arrayToString = (array) => array.toString().replace(/,/gi, ', ');

  const companyName = involved_companies
    ? involved_companies[0].company.name
    : null;

  const genresList = genres
    ? arrayToString(genres.map((item) => item.name))
    : null;

  const platformsList = platforms
    ? arrayToString(platforms.map((item) => item.name))
    : null;

  // 미디어 정보
  const screenshotsData = screenshots ? screenshots : [];
  const videosData = videos ? videos : [];

  const mediaContents = [...screenshotsData, ...videosData];

  const mediaSliderPropsFunc = (length) => {
    if (length >= 3) {
      return {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        spaceBetween: 60,
        initialSlide: -1,
        allowTouchMove: true
      };
    } else {
      const spaceBetween = length === 1 ? 0 : 30;
      const initialSlide = length === 1 ? 1 : 2;

      return {
        loop: false,
        navigation: false,
        spaceBetween,
        initialSlide,
        allowTouchMove: false
      };
    }
  };

  const mediaSliderProps = mediaSliderPropsFunc(mediaContents.length);

  const showMediaModal = (value) => {
    setModalState(true);
    setCurrentModalIdx(value);
  };

  const prevModalContent = () => {
    if (currentModalIdx > 0) {
      setCurrentModalIdx(currentModalIdx - 1);
    } else {
      setCurrentModalIdx(mediaContents.length - 1);
    }
  };

  const nextModalContent = () => {
    if (currentModalIdx >= mediaContents.length - 1) {
      setCurrentModalIdx(0);
    } else {
      setCurrentModalIdx(currentModalIdx + 1);
    }
  };

  useEffect(() => {
    summaryMore && setSummaryMore(false);
    setCurrentTabMenu(1);
  }, [summaryMore]);

  return (
    <section>
      <S.Section>
        <S.InfoBox>
          <S.CoverImgBox>
            <img
              src={`${IGDB_COVER_URL}${coverImg}.jpg`}
              alt={`${detailData.name}-cover`}
            />
          </S.CoverImgBox>
          <S.InfoText>
            <h3>{name}</h3>
            <p>{timeStampToDate(first_release_date)}</p>
            <strong>
              {aggregated_rating
                ? `${Math.floor(aggregated_rating)}%`
                : '평가없음'}
            </strong>
            <S.InfoTabMenuBox>
              <List>
                {tabMenuTitles.map((item, idx) => (
                  <React.Fragment key={item}>
                    <S.InfoTabMenuTitle
                      onClick={() => setCurrentTabMenu(idx + 1)}
                      dataValue={currentTabMenu}
                    >
                      {item}
                    </S.InfoTabMenuTitle>
                  </React.Fragment>
                ))}
              </List>
              <S.InfoTabMenuContent>
                {currentTabMenu === 1 && <DetailSummary summary={summary} />}
                {currentTabMenu === 2 && (
                  <DetailInformation
                    data={{ companyName, genresList, platformsList }}
                  />
                )}
                {currentTabMenu === 3 && <DetailWebSite websites={websites} />}
                {currentTabMenu === 4 && (
                  <DeatailAgeRating ageRatings={age_ratings} />
                )}
              </S.InfoTabMenuContent>
            </S.InfoTabMenuBox>
          </S.InfoText>
        </S.InfoBox>
      </S.Section>
      {mediaContents.length ? (
        <S.Section>
          <SectionTitle title='미디어' />
          <S.MediaSlideBox>
            <S.MediaSlide
              css={{
                'margin-left': mediaContents.length >= 3 ? '-220px' : '0'
              }}
              loop={mediaSliderProps.loop}
              navigation={mediaSliderProps.navigation}
              spaceBetween={mediaSliderProps.spaceBetween}
              slidesPerView='auto'
              initialSlide={mediaSliderProps.initialSlide}
              allowTouchMove={mediaSliderProps.allowTouchMove}
            >
              {mediaContents.map((item, idx) => (
                <SwiperSlide key={idx} className={`${idx}`}>
                  <S.MediaSlideContent
                    onClick={() => showMediaModal(idx)}
                    css={{
                      background:
                        item.image_id && !item.video_id
                          ? `url('//images.igdb.com/igdb/image/upload/t_original/${item.image_id}.jpg') center no-repeat;`
                          : `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url('https://i.ytimg.com/vi/${item.video_id}/hqdefault.jpg') center no-repeat;`,
                      'background-size': '100%'
                    }}
                  >
                    {item.video_id && <MdPlayArrow />}
                  </S.MediaSlideContent>
                </SwiperSlide>
              ))}
            </S.MediaSlide>
            {mediaContents.length >= 3 && (
              <>
                <span className='swiper-button-prev'>
                  <MdChevronLeft />
                </span>
                <span className='swiper-button-next'>
                  <MdChevronRight />
                </span>
              </>
            )}
          </S.MediaSlideBox>
          {modalState && (
            <>
              <S.MediaModalBg onClick={() => setModalState(false)} />
              <S.MediaModal>
                <S.MediaModalContent>
                  {mediaContents.length !== 1 && (
                    <MdChevronLeft onClick={prevModalContent} />
                  )}
                  <div>
                    {mediaContents[currentModalIdx]?.image_id ? (
                      <img
                        src={`//images.igdb.com/igdb/image/upload/t_original/${mediaContents[currentModalIdx].image_id}.jpg`}
                        alt=''
                      />
                    ) : (
                      <iframe
                        title='youtube-video'
                        src={`https://www.youtube.com/embed/${mediaContents[currentModalIdx].video_id}?rel=0&amp;showinfo=0`}
                        allowFullScreen
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      />
                    )}
                  </div>
                  {mediaContents.length !== 1 && (
                    <MdChevronRight onClick={nextModalContent} />
                  )}
                </S.MediaModalContent>
              </S.MediaModal>
            </>
          )}
        </S.Section>
      ) : null}
      {similarGameData.length ? (
        <S.Section>
          <SectionTitle title='비슷한 게임' />
          <GameList data={similarGameData} />
        </S.Section>
      ) : null}
      <S.Section>
        <SectionTitle title='최근 본 게임' />
        <S.RecentGameList>
          {recentGamesData.length
            ? recentGamesData.map((item, idx) => (
                <GameCard
                  key={idx}
                  id={item.id}
                  cover={item.cover.image_id}
                  name={item.name}
                  rating={item.aggregated_rating ? item.aggregated_rating : 0}
                />
              ))
            : [...Array(5)].map((item, idx) => (
                <GameCard key={idx} skeleton={true} />
              ))}
        </S.RecentGameList>
      </S.Section>
    </section>
  );
};
