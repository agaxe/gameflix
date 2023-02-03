import { HTMLAttributes } from 'react';

export interface ListProps extends HTMLAttributes<HTMLLIElement> {
  flex?: boolean;
  align?: string;
  justify?: string;
  direction?: string;
  children: React.ReactNode;
}
