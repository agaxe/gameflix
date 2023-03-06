export type Filters = {
  checkedGenres: number[];
  releaseDate: number[];
  ratingScore: number[];
  sortValue: string[];
};

export interface DiscoverPageTempProps {
  data: { success: boolean; filterGameList: any[] }; // 필터링 결과 리스트
  genres: object[]; // 장르 리스트
  checkedGenresData: Filters['checkedGenres']; // 장르 선택 데이터
  releaseDateData: Filters['releaseDate']; // 발매일 선택 데이터
  ratingScoreData: Filters['ratingScore']; // 평점 선택 데이터
  sortValueData: Filters['sortValue']; // 정렬 select 데이터
  searchFunc: (filters: Filters) => void; // 필터링 실행 함수
}
