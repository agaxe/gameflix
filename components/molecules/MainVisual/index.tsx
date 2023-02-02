import React from 'react';
import Link from 'next/link';
import { pxToRem } from 'static/styles/common';
import { VAR_COLOR } from 'static/styles/variable';
import styled from 'styled-components';
// ? swiper
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const { COLOR_WHITE, COLOR_PRIMARY } = VAR_COLOR;

SwiperCore.use([Pagination, Autoplay]);

// * type
type MainVisualProps = {
  className?: string;
  /** 발매예정 게임 데이터 */
  comingSoonData: any[];
};

// * component
function MainVisualComp({ comingSoonData, className }: MainVisualProps) {
  return (
    <MainVisualBox className={className}>
      <Swiper
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {comingSoonData &&
          comingSoonData.map((item, idx) => {
            const date = new Date(item.first_release_date * 1000);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            return (
              <SwiperSlide key={idx}>
                <Link href={`/detail?id=${item.id}`}>
                  <MainVisual
                    background={`//images.igdb.com/igdb/image/upload/t_screenshot_big/${item.screenshots[0].image_id}.jpg`}
                  >
                    <div>
                      <h4>{item.name}</h4>
                      <p>
                        {year}년 {month}월 {day}일 발매
                      </p>
                    </div>
                  </MainVisual>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </MainVisualBox>
  );
}
export default MainVisualComp;

// * style
const MainVisualBox = styled.div`
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 30px;
  }
  .swiper-pagination-bullet {
    width: 30px;
    height: 5px;
    border-radius: 0;
    background: #ddd;
    &.swiper-pagination-bullet-active {
      background: ${COLOR_PRIMARY} !important ;
    }
  }
`;
const MainVisual = styled.div<{ background: string }>`
  height: 500px;
  background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url('${(props) => props.background}') no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 100px;
  div {
    color: ${COLOR_WHITE};
    h4 {
      font-size: ${pxToRem(53)};
      margin-bottom: 25px;
    }
    p {
      font-size: ${pxToRem(38)};
      font-weight: 200;
    }
  }
`;
