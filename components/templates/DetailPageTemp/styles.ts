import styled from 'styled-components';
import { Swiper } from 'swiper/react';
import { Item } from '@/components/atoms/Item';
import { List } from '@/components/atoms/List';
import { pxToRem } from '@/static/styles/common';
import { VAR_COLOR, VAR_SIZE } from '@/static/styles/variable';

const { COLOR_PRIMARY, COLOR_WHITE, COLOR_GRAY } = VAR_COLOR;
const { CONTENT_WIDTH, GAME_CARD_WIDTH } = VAR_SIZE;

// * style
export const Section = styled.div`
  margin-bottom: 60px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;
export const InfoBox = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`;

export const CoverImgBox = styled.div`
  margin-right: 48px;
  width: 376px;
  height: 490px;
  flex: 0 0 auto;
  position: relative;
  img {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
  }
`;

export const InfoText = styled.div`
  flex: 1 1 auto;
  //width: calc(${CONTENT_WIDTH} - 350px);
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
export const InfoTabMenuBox = styled.div`
  margin-top: 44px;
  & > div {
    min-height: 160px;
  }
`;
export const tabMenuColor = '#9B9B9B';

// export const NoGameInfoText = styled.p`
//   width: 100%;
//   font-weight: 300;
//   color: ${tabMenuColor};
// `;
export const InfoTabMenuTitle = styled(Item)<{ dataValue: number }>`
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
export const InfoTabMenuContent = styled.div`
  /* li {
    margin-bottom: 15px;
    line-height: 1.5;
    &:last-of-type {
      margin-bottom: 0;
    }
  } */
`;
export const GameSummary = styled.div<{ summaryMore: boolean }>`
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

export const MediaSlideWrap = styled.div`
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
export const MediaSlide = styled(Swiper)`
  &.center {
    margin-left: -220px;
  }
  .swiper-slide {
    width: 500px !important;
    height: 280px;
    background: ${COLOR_GRAY};
    position: relative;
    overflow: hidden;
  }
`;
export const MediaSlideContent = styled.div<{ imgId: number; videoId: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-size 0.3s;
  cursor: pointer;
  background: ${({ imgId, videoId }) =>
    imgId && !videoId
      ? `url(' //images.igdb.com/igdb/image/upload/t_original/${imgId}.jpg') center no-repeat`
      : `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url('https://i.ytimg.com/vi/${videoId}/hqdefault.jpg') center no-repeat`};
  background-size: 100%;
  &:hover {
    background-size: 104%;
  }
  svg {
    color: ${COLOR_WHITE};
    font-size: 80px;
  }
`;
export const MediaModalBg = styled.div`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 150;
`;
export const MediaModal = styled.div`
  position: fixed;
  z-index: 200;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export const MediaModalContent = styled.div`
  max-width: ${CONTENT_WIDTH};
  display: flex;
  align-items: center;
  & > div {
    width: 900px;
    height: 518px;
    background: #000;
    display: flex;
    justify-content: center;
    margin: 0 20px;
    position: relative;
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
export const RecentGameList = styled(List)`
  display: grid;
  grid-template-columns: repeat(5, ${GAME_CARD_WIDTH});
  justify-content: space-between;
`;
