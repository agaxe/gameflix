import { HtmlHTMLAttributes } from 'react';

export interface ModalBgProps extends HtmlHTMLAttributes<HTMLDivElement> {
  state: boolean; // 상태값
  display?: string; // display css 값
  zIndex?: number; // z-index css 값
  children?: React.ReactNode; // children
}
