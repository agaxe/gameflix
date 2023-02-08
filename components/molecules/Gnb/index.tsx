import React from 'react';
import Link from 'next/link';
import { MdMoreHoriz } from 'react-icons/md';
import { GnbProps } from './interface';
import * as S from './styles';

export const Gnb = ({ className }: GnbProps) => {
  return (
    <S.Gnb className={className}>
      <li>
        <Link href='/discover'>탐색</Link>
      </li>
      <li>
        <MdMoreHoriz />
      </li>
    </S.Gnb>
  );
};
