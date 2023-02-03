import { LiHTMLAttributes } from 'react';

export interface ItemProps extends LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  dataName?: string | number;
  dataValue?: string | number;
}
