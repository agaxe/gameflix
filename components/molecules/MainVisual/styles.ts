import styled from 'styled-components';
import { pxToRem } from '@/static/styles/common';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_WHITE, COLOR_PRIMARY } = VAR_COLOR;

// * style
export const MainVisualBox = styled.div`
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
export const MainVisual = styled.div<{ background: string }>`
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
