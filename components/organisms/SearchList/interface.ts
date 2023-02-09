export interface SearchListProps {
  data: any[]; // 검색결과 데이터
  type: 'list' | 'card' | string; // 검색결과 리스트 타입
  result: 'yes' | 'no' | string; // 검색결과 데이터 존재 여부
}
