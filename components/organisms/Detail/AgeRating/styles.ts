import styled from 'styled-components';
import { List } from '@/components/atoms/List';

export const AgeRatingList = styled(List)`
  li {
    margin-right: 20px;
    & > img {
      height: 100px;
    }
  }
`;
