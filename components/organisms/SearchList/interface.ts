export interface SearchListProps {
  data: any[]; // 검색결과 데이터
  type: 'LIST' | 'CARD'; // 검색결과 리스트 타입
  hasResult: boolean; // 검색결과 데이터 존재 여부
}
