import styled from 'styled-components';
import { Item } from '@/components/atoms/Item';
import { List } from '@/components/atoms/List';
import { pxToRem } from '@/static/styles/common';

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;
export const PaginationList = styled(List)`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;
export const PaginationItem = styled(Item)`
  margin: 0 15px;
  font-size: ${pxToRem(22)};
  cursor: pointer;
  svg {
    font-size: ${pxToRem(19)};
  }
`;
