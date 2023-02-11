export interface SelectProps {
  className?: string; // 클래스 명
  width: string; // 넓이값
  firstTitle: string; // 초기값 타이틀
  options: any[]; // option 리스트
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void; // 클릭 이벤트
}
