import React, { useState } from 'react';
import { MdChevronLeft, MdChevronRight, MdPlayArrow } from 'react-icons/md';
import SwiperCore, { Navigation } from 'swiper';
import { SwiperSlide } from 'swiper/react';
import { Image } from '@/components/atoms/Image';
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
  const [currentModalIdx, setCurrentModalIdx] = useState(0);
  const [isShowMediaModal, setIsShowMediaModal] = useState(false);

  const {
    name,
    cover,
    first_release_date,
    aggregated_rating,
    summary,
    involved_companies: companies,
    genres,
    platforms,
    age_ratings,
    websites,
    screenshots = [],
    videos = []
  } = detailData;

  //게임 정보
  const coverImg = cover?.image_id || NO_COVER_IMAGE;

  const timeStampToDate = (timeStamp: number) => {
    if (timeStamp) {
      return getUnixTimeStampToDate(timeStamp, 'yyyy년 MM월 d일 출시');
    }

    return '출시일 정보 없음';
  };

  // 미디어 정보
  const mediaContents = [...screenshots, ...videos];
  const isSlider = mediaContents.length >= 3;

  const getMediaSliderOption = (mediaLength: number) => {
    return {
      loop: isSlider,
      navigation: isSlider
        ? {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        : false,
      spaceBetween: isSlider ? 60 : mediaLength === 1 ? 0 : 30,
      initialSlide: isSlider ? -1 : mediaLength === 1 ? 1 : 2,
      allowTouchMove: isSlider
    };
  };

  const mediaSliderProps = getMediaSliderOption(mediaContents.length);

  const handleClickMediaSlide = (idx: number) => {
    setIsShowMediaModal(true);
    setCurrentModalIdx(idx);
  };

  const handleClickModalPrevBtn = () => {
    if (currentModalIdx > 0) {
      setCurrentModalIdx(currentModalIdx - 1);
      return;
    }
    setCurrentModalIdx(mediaContents.length - 1);
  };

  const handleClickModalNextBtn = () => {
    if (currentModalIdx >= mediaContents.length - 1) {
      setCurrentModalIdx(0);
      return;
    }
    setCurrentModalIdx(currentModalIdx + 1);
  };

  return (
    <section>
      <S.Section>
        <S.InfoBox>
          <S.CoverImgBox>
            <Image
              src={`${IGDB_COVER_URL}/${coverImg}.jpg`}
              alt={`${detailData.name} cover image`}
              fill={false}
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
                  <DetailInformation data={{ companies, genres, platforms }} />
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
          <S.MediaSlideWrap>
            <S.MediaSlide
              className={isSlider ? 'center' : ''}
              loop={mediaSliderProps.loop}
              navigation={mediaSliderProps.navigation}
              spaceBetween={mediaSliderProps.spaceBetween}
              initialSlide={mediaSliderProps.initialSlide}
              allowTouchMove={mediaSliderProps.allowTouchMove}
              slidesPerView='auto'
            >
              {mediaContents.map((item, idx) => (
                <SwiperSlide key={item.id}>
                  <S.MediaSlideContent
                    onClick={() => handleClickMediaSlide(idx)}
                    imgId={item?.image_id}
                    videoId={item?.video_id}
                  >
                    {item?.video_id && <MdPlayArrow />}
                  </S.MediaSlideContent>
                </SwiperSlide>
              ))}
            </S.MediaSlide>
            {isSlider && (
              <>
                <span className='swiper-button-prev'>
                  <MdChevronLeft />
                </span>
                <span className='swiper-button-next'>
                  <MdChevronRight />
                </span>
              </>
            )}
          </S.MediaSlideWrap>
          {isShowMediaModal && (
            <>
              <S.MediaModalBg onClick={() => setIsShowMediaModal(false)} />
              <S.MediaModal>
                <S.MediaModalContent>
                  {mediaContents.length !== 1 && (
                    <MdChevronLeft onClick={handleClickModalPrevBtn} />
                  )}
                  <div>
                    {mediaContents[currentModalIdx]?.image_id ? (
                      <Image
                        src={`http://images.igdb.com/igdb/image/upload/t_original/${mediaContents[currentModalIdx].image_id}.jpg`}
                        alt={`${name} image ${currentModalIdx}`}
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
                    <MdChevronRight onClick={handleClickModalNextBtn} />
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
            ? recentGamesData.map((item) => (
                <GameCard
                  key={item.id}
                  id={item.id}
                  cover={item.cover.image_id}
                  name={item.name}
                  rating={item?.aggregated_rating ? item.aggregated_rating : 0}
                />
              ))
            : [...Array(5)].map((_, idx) => (
                <GameCard key={idx} skeleton={true} />
              ))}
        </S.RecentGameList>
      </S.Section>
    </section>
  );
};
