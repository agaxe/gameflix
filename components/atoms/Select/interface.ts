export interface SelectProps {
  /** 클래스 명 */
  className?: string;
  /** 넓이값  */
  width: string;
  /** 초기값 타이틀 */
  firstTitle: string;
  /** option 리스트  */
  options: any[];
  /** 클릭 이벤트  */
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}
