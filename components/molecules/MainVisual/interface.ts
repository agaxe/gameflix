import { HTMLAttributes } from 'react';
import { MainPageTempProps } from '@/components/templates/MainPageTemp/interface';

// * type
export type MainVisualProps = HTMLAttributes<HTMLDivElement> &
  Pick<MainPageTempProps, 'comingSoonGames'>;
