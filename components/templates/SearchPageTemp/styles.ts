import styled, { FlattenSimpleInterpolation, css } from 'styled-components';
import { SearchListProps } from '@/components/organisms/SearchList/interface';
import { PAGE_TITLE_BOTTOM } from '@/static/styles/common';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_GRAY } = VAR_COLOR;

type ListType = SearchListProps['type'];

const styles: Record<ListType, FlattenSimpleInterpolation> = {
  CARD: css`
    &:first-of-type {
      color: ${COLOR_GRAY};
    }
  `,
  LIST: css`
    &:last-of-type {
      color: ${COLOR_GRAY};
    }
  `
};
export const ListTypeBox = styled.div<{ type: ListType }>`
  svg {
    ${({ type }) => styles[type]}
  }
`;

export const PageTitleBottom = styled.div`
  ${PAGE_TITLE_BOTTOM};
`;
