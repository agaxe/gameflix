import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MdFirstPage, MdLastPage } from 'react-icons/md';
import { VAR_COLOR } from '@/static/styles/variable';
import { PaginationProps } from './interface';
import * as S from './styles';

const { COLOR_PRIMARY } = VAR_COLOR;

export const Pagination = ({ length, current = 1 }: PaginationProps) => {
  const router = useRouter();
  const [maxPageLength, setMaxPageLength] = useState(0);
  const searchQuery = router?.query?.q || '';

  useEffect(() => {
    if (current === length || length === 1) {
      setMaxPageLength(1);
      return;
    }
    if (current === length - 1) {
      setMaxPageLength(2);
      return;
    }

    setMaxPageLength(3);
  }, [current, length]);

  const movePage = (page: number) => {
    router
      .push({
        query: {
          q: searchQuery,
          page
        }
      })
      .then(() => window.scrollTo(0, 0));
  };

  return (
    <S.Pagination>
      <S.PaginationList>
        {current !== 1 && (
          <S.PaginationItem onClick={() => movePage(1)}>
            <MdFirstPage />
          </S.PaginationItem>
        )}
        {[...Array(maxPageLength)].map((item, idx) => {
          const Number =
            current === 1 || current >= length - 1
              ? current + idx
              : current - 1 + idx;
          return (
            <S.PaginationItem
              key={idx}
              onClick={() => movePage(Number)}
              css={{ color: `${current === Number && COLOR_PRIMARY}` }}
            >
              {Number}
            </S.PaginationItem>
          );
        })}
        {current < length && (
          <S.PaginationItem onClick={() => movePage(length)}>
            <MdLastPage />
          </S.PaginationItem>
        )}
      </S.PaginationList>
    </S.Pagination>
  );
};
