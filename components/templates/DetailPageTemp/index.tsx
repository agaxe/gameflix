import React, { useEffect, useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { MdChevronLeft, MdChevronRight, MdPlayArrow } from 'react-icons/md';
import styled from 'styled-components';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Item } from '@/components/atoms/Item';
import { List } from '@/components/atoms/List';
import { GameCard, SectionTitle } from '@/components/molecules';
import { GameList } from '@/components/organisms';
import { IGDB_COVER_URL, NO_COVER_IMAGE } from '@/common/variables';
import { pxToRem } from '@/static/styles/common';
import { VAR_COLOR, VAR_SIZE } from '@/static/styles/variable';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const { COLOR_LINE_GRAY, COLOR_PRIMARY, COLOR_WHITE, COLOR_GRAY } = VAR_COLOR;
const { CONTENT_WIDTH } = VAR_SIZE;

SwiperCore.use([Navigation]);

// * type
type DetailPageProps = {
  /** 게임 상세 데이터 */
  detailData: any;
  /** 비슷한 게임 데이터 */
  similarGameData: any[];
  /** 최근 본 게임 */
  recentGamesData: any[];
};

// * component
function DetailPageTemp({
  detailData,
  similarGameData,
  recentGamesData
}: DetailPageProps) {
  const [currentTabMenu, setCurrentTabMenu] = useState(1);
  const [summaryMore, setSummaryMore] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [currentModalIdx, setCurrentModalIdx] = useState(0);
  // const IGDB_COVER_URL = process.env.IGDB_COVER_URL;
  // const NO_COVER_IMAGE = process.env.NO_COVER_IMAGE;

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

  // 탭 정보
  const TabMenuTitleData = ['게임 설명', '정보', '관련 사이트', '게임 등급'];

  //게임 정보
  const coverImg = cover ? cover.image_id : NO_COVER_IMAGE;
  const timeStampToDate = (timeStamp) => {
    if (timeStamp) {
      const date = new Date(timeStamp * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return `${year}년 ${month}월 ${day}일 출시`;
    }
    return '출시일 정보 없음';
  };
  const summaryShort = summary ? summary.substr(0, 200) : null;
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

  const webSiteText = (category) => {
    const categoryList = [
      { category: '1', title: 'official' },
      { category: '2', title: 'wikia' },
      { category: '3', title: 'wikipedia' },
      { category: '4', title: 'facebook' },
      { category: '5', title: 'twitter' },
      { category: '6', title: 'twitch' },
      { category: '8', title: 'instagram' },
      { category: '9', title: 'youtube' },
      { category: '10', title: 'iphone' },
      { category: '11', title: 'ipad' },
      { category: '12', title: 'android' },
      { category: '13', title: 'steam' },
      { category: '14', title: 'reddit' },
      { category: '15', title: 'itch' },
      { category: '16', title: 'epicgames' },
      { category: '17', title: 'GOG' },
      { category: '18', title: 'discord' }
    ];
    const categoryInfo = categoryList.filter(
      (item) => +item.category === category
    );
    const categoryTitle = categoryInfo[0].title;
    return categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1);
  };

  const ageRatingImg = (category, rating) => {
    const categoryText = category === 1 ? 'ESRB' : 'PEGI';
    const imgExt = category === 1 ? 'svg' : 'png';
    const imgSrc = `${categoryText}_${rating}.${imgExt}`;

    return `${categoryText}/${imgSrc}`;
  };

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

  const noGameInfo = (type: string) => {
    return (
      <NoGameInfoText>
        <p>{type} 정보가 없습니다 :(</p>
      </NoGameInfoText>
    );
  };

  useEffect(() => {
    summaryMore && setSummaryMore(false);
    setCurrentTabMenu(1);
  }, [detailData]);

  return (
    <section>
      <SectionBox>
        <InfoBox>
          <CoverImgBox>
            <img
              src={`${IGDB_COVER_URL}${coverImg}.jpg`}
              alt={`${detailData.name}-cover`}
            />
          </CoverImgBox>
          <InfoText>
            <h3>{name}</h3>
            <p>{timeStampToDate(first_release_date)}</p>
            <strong>
              {aggregated_rating
                ? `${Math.floor(aggregated_rating)}%`
                : '평가없음'}
            </strong>
            <InfoTabMenuBox>
              <List>
                {TabMenuTitleData.map((item, idx) => (
                  <React.Fragment key={item}>
                    <InfoTabMenuTitle
                      onClick={() => setCurrentTabMenu(idx + 1)}
                      dataValue={currentTabMenu}
                    >
                      {item}
                    </InfoTabMenuTitle>
                  </React.Fragment>
                ))}
              </List>
              <InfoTabMenuContent>
                {currentTabMenu === 1 && (
                  <GameSummary summaryMore={summaryMore}>
                    {!summary ? (
                      noGameInfo('설명')
                    ) : summary &&
                      !summaryMore &&
                      summary.length > summaryShort.length ? (
                      <>
                        <p>{summaryShort}...</p>
                        <span onClick={() => setSummaryMore(true)}>more</span>
                      </>
                    ) : (
                      <p>{summary}</p>
                    )}
                  </GameSummary>
                )}
                {currentTabMenu === 2 && (
                  <GameInfoList>
                    <List direction='column'>
                      {!companyName && !genresList && !platformsList ? (
                        noGameInfo('관련')
                      ) : (
                        <>
                          {companyName && (
                            <Item>
                              <span>제작</span>
                              <p>{companyName}</p>
                            </Item>
                          )}
                          {genresList && (
                            <Item>
                              <span>장르</span>
                              <p>{genresList}</p>
                            </Item>
                          )}
                          {platformsList && (
                            <Item>
                              <span>플랫폼</span>
                              <p>{platformsList}</p>
                            </Item>
                          )}
                        </>
                      )}
                    </List>
                  </GameInfoList>
                )}
                {currentTabMenu === 3 && (
                  <WebSiteList>
                    {websites
                      ? websites.map((item, idx) => (
                          <Item key={idx}>
                            <a href={item.url} target='_blank'>
                              {webSiteText(item.category)}
                              <BiLinkExternal />
                            </a>
                          </Item>
                        ))
                      : noGameInfo('관련 사이트')}
                  </WebSiteList>
                )}
                {currentTabMenu === 4 && (
                  <AgeRatingList>
                    {age_ratings
                      ? age_ratings.map((item, idx) => (
                          <Item key={idx}>
                            <img
                              src={`/static/images/game_rating/${ageRatingImg(
                                item.category,
                                item.rating
                              )}`}
                              alt={`${ageRatingImg(
                                item.category,
                                item.rating
                              )}`}
                            />
                          </Item>
                        ))
                      : noGameInfo('등급')}
                  </AgeRatingList>
                )}
              </InfoTabMenuContent>
            </InfoTabMenuBox>
          </InfoText>
        </InfoBox>
      </SectionBox>
      {mediaContents.length ? (
        <SectionBox>
          <SectionTitle title='미디어' />
          <MediaSlideBox>
            <MediaSlide
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
                  <MediaSlideContent
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
                  </MediaSlideContent>
                </SwiperSlide>
              ))}
            </MediaSlide>
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
          </MediaSlideBox>
          {modalState && (
            <>
              <MediaModalBg onClick={() => setModalState(false)} />
              <MediaModal>
                <MediaModalContent>
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
                        src={`https://www.youtube.com/embed/${mediaContents[currentModalIdx].video_id}?rel=0&amp;showinfo=0`}
                        frameBorder='0'
                        allowFullScreen
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      />
                    )}
                  </div>
                  {mediaContents.length !== 1 && (
                    <MdChevronRight onClick={nextModalContent} />
                  )}
                </MediaModalContent>
              </MediaModal>
            </>
          )}
        </SectionBox>
      ) : null}
      {similarGameData.length ? (
        <SectionBox>
          <SectionTitle title='비슷한 게임' />
          <GameList data={similarGameData} />
        </SectionBox>
      ) : null}
      <SectionBox>
        <SectionTitle title='최근 본 게임' />
        <RecentGameList>
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
        </RecentGameList>
      </SectionBox>
    </section>
  );
}
export default DetailPageTemp;

// * style
const SectionBox = styled.div`
  margin-bottom: 60px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;
const InfoBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const CoverImgBox = styled.div`
  padding-right: 50px;
  width: 300px;
  img {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
  }
`;
const InfoText = styled.div`
  width: calc(${CONTENT_WIDTH} - 350px);
  & > h3 {
    width: 100%;
    line-height: 1.4;
  }
  & > p {
    margin: 20px 0 34px 0;
    font-weight: 300;
    font-size: ${pxToRem(20)};
  }
  & > strong {
    font-size: ${pxToRem(40)};
  }
`;
const InfoTabMenuBox = styled.div`
  margin-top: 44px;
  & > div {
    min-height: 160px;
  }
`;
const tabMenuColor = '#9B9B9B';

const NoGameInfoText = styled(Item)`
  width: 100% !important;
  p {
    font-weight: 300;
    color: ${tabMenuColor};
  }
`;
const InfoTabMenuTitle = styled(Item)<{ dataValue: number }>`
  cursor: pointer;
  margin-right: 40px;
  margin-bottom: 25px;
  padding-bottom: 8px;

  &:last-of-type {
    margin-right: 0;
  }
  &:nth-of-type(${(props) => props.dataValue}) {
    border-bottom: 2px solid ${COLOR_PRIMARY};
  }
`;
const InfoTabMenuContent = styled.div`
  li {
    margin-bottom: 15px;
    line-height: 1.5;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;
const GameSummary = styled.div<{ summaryMore: boolean }>`
  & > p {
    font-weight: 300;
    line-height: 200.8%;
    vertical-align: top;
    white-space: ${(props) => (props.summaryMore ? 'pre-wrap' : 'normal')};
  }
  & > span {
    display: block;
    color: ${COLOR_PRIMARY};
    font-weight: 400;
    margin-top: 15px;
    cursor: pointer;
  }
`;
const GameInfoList = styled(List)`
  flex-wrap: wrap;
  & > ul {
    width: 100%;
    li {
      flex-wrap: wrap;
      display: flex;
      justify-content: space-between;
      & > span {
        color: ${tabMenuColor};
      }
      & > p {
        font-weight: 300;
        width: 90%;
      }
    }
  }
`;
const WebSiteList = styled(List)`
  flex-wrap: wrap;
  width: 50%;
  & > li {
    width: 33%;
    a {
      display: flex;
      align-items: center;
      font-weight: 300;
      svg {
        margin-left: 5px;
        color: ${tabMenuColor};
      }
    }
  }
`;
const AgeRatingList = styled(List)`
  li {
    margin-right: 20px;
    & > img {
      height: 100px;
    }
  }
`;
const MediaSlideBox = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  & > span {
    width: auto;
    height: auto;
    display: block;
    transform: translate(0, -50%);
    margin-top: 0;
    background: ${COLOR_PRIMARY};
    &.swiper-button-prev {
      left: 0;
    }
    &.swiper-button-next {
      right: 0;
    }
    &::after {
      content: '';
    }
    svg {
      font-size: 60px !important;
      color: ${COLOR_WHITE} !important;
    }
  }
`;
const MediaSlide = styled(Swiper)`
  .swiper-slide {
    width: 500px !important;
    height: 280px;
    background: ${COLOR_GRAY};
    position: relative;
    overflow: hidden;
  }
`;
const MediaSlideContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-size 0.3s;
  cursor: pointer;
  &:hover {
    background-size: 104%;
  }
  svg {
    color: ${COLOR_WHITE};
    font-size: 80px;
  }
`;
const MediaModalBg = styled.div`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 150;
`;
const MediaModal = styled.div`
  position: fixed;
  z-index: 200;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const MediaModalContent = styled.div`
  max-width: ${CONTENT_WIDTH};
  display: flex;
  align-items: center;
  & > div {
    width: 900px;
    background: #000;
    display: flex;
    justify-content: center;
    margin: 0 20px;
    & > * {
      user-select: none;
    }
    & > img {
      max-width: 100%;
      max-height: 80vh;
    }
    & > iframe {
      width: 100%;
      height: 500px;
    }
  }
  & > svg {
    font-size: 50px;
    cursor: pointer;
    color: ${COLOR_WHITE};
  }
`;
const RecentGameList = styled(List)`
  & > li {
    margin-right: 20px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;
