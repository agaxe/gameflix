import styled from 'styled-components';
import { Item } from '@/components/atoms/Item';
import { List } from '@/components/atoms/List';

export const GameInfoList = styled(List)`
  flex-wrap: wrap;
  width: 100%;
  gap: 16px;
`;

export const GameInfoItem = styled(Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GameInfoTitle = styled.span`
  color: #9b9b9b;
  min-width: 50px;
`;

export const GameInfoContent = styled.p`
  font-weight: 300;
  width: 90%;
`;
