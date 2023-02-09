import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MdSearch } from 'react-icons/md';
import { SearchInputProps } from './interface';
import * as S from './styles';

export const SearchInput = ({ className, handleSearch }: SearchInputProps) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');

  // 현재 페이지가 search 가 아니면 검색input의 value를 초기화
  useEffect(() => {
    const pathname = router.pathname;
    const query =
      pathname === '/search' && router.query && router.query.q
        ? router.query.q
        : '';

    setQuery(`${query}`);
  }, [router]);

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleKeyDownSearchInput = (e) => {
    e.key === 'Enter' && handleSearch(query);
  };

  return (
    <S.SearchInputBox className={className}>
      <S.SearchInput
        name='search'
        value={query}
        placeholder='검색'
        onChange={handleChangeSearchInput}
        onKeyDown={handleKeyDownSearchInput}
      />
      <S.SearchBtn onClick={() => handleSearch(query)}>
        <MdSearch />
      </S.SearchBtn>
    </S.SearchInputBox>
  );
};
