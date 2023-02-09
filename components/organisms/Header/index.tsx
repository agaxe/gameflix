import React from 'react';
import { useRouter } from 'next/router';
import { Logo } from '@/components/atoms/Logo';
import { Gnb } from '@/components/molecules/Gnb';
import { HeaderProps } from './interface';
import * as S from './styles';

export const Header = ({ className = '' }: HeaderProps) => {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (!query) {
      alert('검색어를 입력 해주세요');
      return;
    }

    router
      .push({
        pathname: `/search`,
        query: { q: query }
      })
      .then(() => window.scrollTo(0, 0));
  };

  return (
    <S.Header className={className}>
      <Logo />
      <S.HeaderSearchInput handleSearch={handleSearch} />
      <Gnb />
    </S.Header>
  );
};
