export interface GameItemProps {
  id?: number; // 게임 아이디
  cover?: string; // 커버 이미지 아이디
  name?: string; // 게임 이름
  releaseDate?: string | number; // 게임 출시 년도
  skeleton?: boolean; // 스켈레톤 여부
}
