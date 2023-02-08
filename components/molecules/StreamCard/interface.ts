export interface StreamCardProps {
  skeleton?: boolean; // 스켈레톤 여부
  id?: string; // 스트리머 아이디 (영문)
  name?: string; // 스트리머 이름
  title?: string; // 방송 제목
  profileImg?: string; // 스트리머 프로필 이미지
  thumbnail?: string; // 방송 썸네일 이미지
  viewer?: number; // 방송 시청자 수
}
