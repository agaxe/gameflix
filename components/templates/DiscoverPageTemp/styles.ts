import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import { Button } from '@/components/atoms/Button';
import { Item } from '@/components/atoms/Item';
import { List } from '@/components/atoms/List';
import { Select } from '@/components/atoms/Select';
import { PAGE_TITLE_BOTTOM } from '@/static/styles/common';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_WHITE } = VAR_COLOR;

export const PageTitleBottom = styled.div`
  ${PAGE_TITLE_BOTTOM};
`;

export const DiscoverSelect = styled(Select)`
  right: 0;
  top: 33px;
`;

export const GameList = styled(List)`
  flex-wrap: wrap;
  box-sizing: border-box;
  li {
    margin-right: 20px;
    margin-bottom: 35px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
`;

export const filterMenuBoxWidth = '410px';
export const FilterMenuBox = styled.div<{ state: boolean }>`
  position: fixed;
  right: ${(props) => (props.state ? '0' : `-${filterMenuBoxWidth}`)};
  transition: right 0.3s;
  width: ${filterMenuBoxWidth};
  height: 100%;
  z-index: 100;
  top: 0;
`;

export const FilterMenu = styled.div`
  position: absolute;
  z-index: 150;
  right: 0;
  top: 0;
  width: calc(${filterMenuBoxWidth} - 50px);
  height: 100%;
  overflow-y: scroll;
  background: ${COLOR_WHITE};
  & > div {
    width: 80%;
    margin: 0 auto;
    padding: 45px 0px;
  }
`;

export const FilterMenuContent = styled.div`
  margin-bottom: 40px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const FilterMenuItem = styled(Item)`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

export const FilterMenuLabel = styled.label`
  width: 80%;
  user-select: none;
`;

export const FilterMenuTitle = styled.h4`
  margin-bottom: 25px;
`;

export const FilterSearchBtn = styled(Button)`
  width: 100%;
  margin-top: 65px;
`;

export const FilterMenuCloseBtn = styled(MdClose)`
  position: absolute;
  left: 0;
  z-index: 200;
  top: 10px;
  color: ${COLOR_WHITE};
  font-size: 40px;
  cursor: pointer;
`;
