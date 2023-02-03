import React from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import { Item } from '@/components/atoms/Item';
import { List } from '@/components/atoms/List';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_PRIMARY, COLOR_LINE_GRAY } = VAR_COLOR;

// * type
type RangeSliderType = {
  /** 전체 넓이 */
  width?: string;
  /** 첫번째 값 */
  firstValue: number;
  /** 마지막 값 */
  lastValue: number;
  /** 최소 값 */
  minRange?: number;
  /** 최대 값 */
  maxRange?: number;
  /** setState 함수 */
  setValue: (value: number[]) => void;
  /** label 여부 */
  label?: boolean;
};

// * style
const thumbSize = 17;
const trackHeight = 7;
const trackRadius = 5;
const halfSize = thumbSize / 2;

const CustomSlider = withStyles({
  root: {
    color: COLOR_PRIMARY,
    height: trackHeight
  },
  thumb: {
    height: thumbSize,
    width: thumbSize,
    backgroundColor: 'currentColor',
    marginTop: -5,
    marginLeft: -halfSize,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  track: {
    height: trackHeight,
    borderRadius: trackRadius
  },
  rail: {
    height: trackHeight,
    borderRadius: trackRadius,
    background: COLOR_LINE_GRAY
  }
})(Slider);

// * component
/**
 * - <a href="https://material-ui.com/@/components/slider" target="_blank">material ui 의 slider</a> 를 활용하였습니다.
 */
function RangeSliderComp({
  width,
  firstValue,
  lastValue,
  minRange,
  maxRange,
  setValue,
  label
}: RangeSliderType) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div css={{ width: width }}>
      <CustomSlider
        aria-labelledby='range slider'
        value={[firstValue, lastValue]}
        onChange={handleChange}
        valueLabelDisplay='off'
        min={minRange}
        max={maxRange}
      />
      {label && (
        <List justify='space-between'>
          <Item>{firstValue}</Item>
          <Item>{lastValue}</Item>
        </List>
      )}
    </div>
  );
}
export default RangeSliderComp;

// * defaultProps
RangeSliderComp.defaultProps = {
  width: '100%',
  minRange: 0,
  maxRange: 100,
  labe: false
};
