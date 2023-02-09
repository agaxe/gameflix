import { HTMLAttributes } from 'react';

export interface GameListProps extends HTMLAttributes<HTMLUListElement> {
  data: any[]; // 게임 리스트 데이터
}
