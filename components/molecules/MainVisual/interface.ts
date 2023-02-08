import { HTMLAttributes } from 'react';

// * type
export interface MainVisualProps extends HTMLAttributes<HTMLDivElement> {
  /** 발매예정 게임 데이터 */
  comingSoonData: any[];
}
