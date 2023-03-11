import { SearchListProps } from '@/components/organisms/SearchList/interface';

export interface SearchPageProps {
  data: any; // 검색 결과 데이터
  searchQuerySB?: string; // 스토리북 테스트 검색어
}

export type ListType = SearchListProps['type'];
