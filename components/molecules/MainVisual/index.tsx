import React from 'react';
import Link from 'next/link';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { MainVisualProps } from './interface';
import * as S from './styles';

SwiperCore.use([Pagination, Autoplay]);

export const MainVisual = ({
  comingSoonGames = [],
  className = ''
}: MainVisualProps) => {
  return (
    <S.MainVisualBox className={className}>
      <Swiper
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {comingSoonGames.length &&
          comingSoonGames.map((item, idx) => {
            const date = new Date(item.first_release_date * 1000);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            return (
              <SwiperSlide key={idx}>
                <Link href={`/detail?id=${item.id}`}>
                  <S.MainVisual
                    background={`//images.igdb.com/igdb/image/upload/t_screenshot_big/${item.screenshots[0].image_id}.jpg`}
                  >
                    <div>
                      <h4>{item.name}</h4>
                      <p>
                        {year}년 {month}월 {day}일 발매
                      </p>
                    </div>
                  </S.MainVisual>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </S.MainVisualBox>
  );
};
