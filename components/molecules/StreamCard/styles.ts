import styled, { css } from 'styled-components';
import { List } from '@/components/atoms/List';
import { STYLE_BOX_SHADOW, STYLE_ELLIPSIS } from '@/static/styles/common';
import { pxToRem } from '@/static/styles/common';

// 방송 카드 박스
export const StreamCard = styled.li`
  ${STYLE_BOX_SHADOW};
  width: 369px;
`;

// 방송 썸네일 박스
export const Thumbnail = styled.div`
  position: relative;
  height: 208px;
  & > * {
    position: absolute;
  }
  img {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
`;

// 공통 스타일
export const Common = css`
  border-radius: 5px;
  color: #fff;
  left: 10px;
  z-index: 5;
`;

// Live 표시 라벨
export const LiveLabel = styled.div`
  ${Common};
  padding: 5px 7px;
  background: #c92a2a;
  top: 10px;
  font-size: ${pxToRem(11)};
  letter-spacing: ${pxToRem(0.8)};
`;

// 시청자 수 라벨
export const ViewerBox = styled.div`
  ${Common};
  background: rgba(0, 0, 0, 0.6);
  padding: 5px;
  bottom: 10px;
  font-size: ${pxToRem(13)};
`;

// 스트리머 정보 박스
export const StreamerInfo = styled.div`
  padding: 14px 10px;
  background: #fff;
  display: flexbox;
  align-items: center;
`;

export const StreamerInfoList = styled(List)`
  width: 80%;
  margin-left: 10px;
`;

export const StreamerTitle = styled.strong`
  font-size: ${pxToRem(15)};
  margin-bottom: 8px;
  ${STYLE_ELLIPSIS}
`;

export const StreamerDesc = styled.p`
  font-size: ${pxToRem(13)};
  ${STYLE_ELLIPSIS}
`;
