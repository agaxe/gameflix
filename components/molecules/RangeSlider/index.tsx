import React from 'react';
import { Item } from '@/components/atoms/Item';
import { List } from '@/components/atoms/List';
import { RangeSliderProps } from './interface';
import * as S from './styles';

/**
 * - [material ui 의 slider](https://material-ui.com/components/slider) 를 활용하였습니다.
 */
export const RangeSlider = ({
  width = '100%',
  firstValue,
  lastValue,
  minRange = 0,
  maxRange = 100,
  setValue,
  hasLabel = false
}: RangeSliderProps) => {
  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ width }}>
      <S.CustomSlider
        aria-labelledby='range slider'
        value={[firstValue, lastValue]}
        onChange={handleChangeValue}
        valueLabelDisplay='off'
        min={minRange}
        max={maxRange}
      />
      {hasLabel && (
        <List justify='space-between'>
          <Item>{firstValue}</Item>
          <Item>{lastValue}</Item>
        </List>
      )}
    </div>
  );
};
