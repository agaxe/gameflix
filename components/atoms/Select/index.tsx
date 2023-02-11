import React, { useEffect, useRef, useState } from 'react';
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
  const selectRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const activeSelectOption = (e) => {
    setIsActive(false);
    onClick(e);
  };

  useEffect(() => {
    const toggleSelectOption = (e: MouseEvent) => {
      if (
        isActive &&
        selectRef.current &&
        !selectRef.current.contains(e.target)
      ) {
        setIsActive(false);
      }
    };

    if (isActive) {
      document.addEventListener('click', toggleSelectOption);
      return () => {
        document.removeEventListener('click', toggleSelectOption);
      };
    }
  }, [isActive]);

  return (
    <S.Select className={className} width={width} ref={selectRef}>
      <S.Title onClick={() => setIsActive((prev) => !prev)}>
        {firstTitle}
        <MdArrowDropDown />
      </S.Title>
      {isActive && (
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
