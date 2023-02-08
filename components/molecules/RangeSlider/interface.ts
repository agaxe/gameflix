export interface RangeSliderProps {
  width?: string; // 전체 넓이
  firstValue: number; // 첫번째 값
  lastValue: number; // 마지막 값
  minRange?: number; // 최소 값
  maxRange?: number; // 최대 값
  setValue: (value: number[]) => void; // setState 함수
  hasLabel?: boolean; // label 여부
}
