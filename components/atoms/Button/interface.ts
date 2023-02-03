import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // 버튼의 텍스트 ;
  className?: string; // 클래스 명 ;
  theme?: 'primary' | 'secondary' | 'tertiary'; // 버튼의 테마 색상
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void; // 버튼 클릭 이벤트 ;
}
