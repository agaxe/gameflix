import React, { useCallback } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { Item } from '@/components/atoms/Item';
import { DetailNoGameInfoTitle } from '@/components/molecules/Detail/NoGameInfoTitle';
import { relatedSites } from './data';
import * as S from './styles';

interface DetailWebSiteProps {
  websites: any[];
}

export const DetailWebSite = ({ websites }: DetailWebSiteProps) => {
  const getWebSiteTitle = useCallback((categoryIdx: number) => {
    const categoryTitle = relatedSites.get(categoryIdx);
    return categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1);
  }, []);

  return (
    <S.WebSiteList>
      {websites?.length ? (
        websites.map((item: any) => (
          <Item key={item.id}>
            <a href={item.url} target='_blank' rel='noreferrer'>
              {getWebSiteTitle(item.category)}
              <BiLinkExternal />
            </a>
          </Item>
        ))
      ) : (
        <DetailNoGameInfoTitle type='관련 사이트' />
      )}
    </S.WebSiteList>
  );
};
