import React, { useEffect, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { SelectProps } from './interface';
import * as S from './styles';

/**
 * - custom style 을 위해 `<div>` 로 제작한 select 입니다.
 */

export const Select = ({
  className,
  width,
  firstTitle,
  options,
  onClick
}: SelectProps) => {
  const [selectItemState, setSelectItemState] = useState(false);

  const activeSelectOption = (e) => {
    setSelectItemState(false);
    onClick(e);
  };

  const toggleSelectOption = () => {
    setSelectItemState(false);
  };

  useEffect(() => {
    if (selectItemState) {
      document.addEventListener('click', toggleSelectOption);
      return () => {
        document.removeEventListener('click', toggleSelectOption);
      };
    }
  }, [selectItemState]);

  return (
    <S.Select className={className} width={width}>
      <S.Title onClick={() => setSelectItemState(!selectItemState)}>
        {firstTitle}
        <MdArrowDropDown />
      </S.Title>
      {selectItemState && (
        <S.SelectList direction='column'>
          {options &&
            options.map((item, idx) => (
              <React.Fragment key={idx}>
                <S.SelectItem
                  onClick={activeSelectOption}
                  dataName={item.title}
                  dataValue={item.value}
                >
                  {item.title}
                </S.SelectItem>
              </React.Fragment>
            ))}
        </S.SelectList>
      )}
    </S.Select>
  );
};
