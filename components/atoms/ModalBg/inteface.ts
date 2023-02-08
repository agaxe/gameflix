import { HTMLAttributes } from 'react';

export interface ModalBgProps extends HTMLAttributes<HTMLDivElement> {
  state: boolean; // 상태값
  display?: string; // display css 값
  zIndex?: number; // z-index css 값
  children?: React.ReactNode; // children
}
