import React from 'react';
import { ListProps } from './inteface';
import * as S from './styles';

/**
 * - `<ul>` 태그를 사용한 List 컴포넌트 입니다.
 * - display 값은 `flex` 값이 **true 면 이 flex** 이고 **false 면 block** 이 적용됩니다.
 * - `align`,`justify`,`direction` 값으로 flex 스타일을 지정할 수 있습니다.
 */
export const List = ({
  flex = true,
  align,
  justify,
  direction,
  children,
  className
}: ListProps) => {
  return (
    <S.List
      flex={flex}
      align={align}
      justify={justify}
      direction={direction}
      className={className}
    >
      {children}
    </S.List>
  );
};
