import React from 'react';
import { ModalBgProps } from './inteface';
import * as S from './styles';

/**
 * - 모달에 사용되는 background 컴포넌트 입니다.
 */
export const ModalBg = ({
  state,
  display = 'block',
  zIndex = 100,
  children,
  ...rest
}: ModalBgProps) => {
  return (
    <S.ModalBg
      state={state}
      css={{ 'z-index': `${zIndex}` }}
      display={display}
      {...rest}
    >
      {children}
    </S.ModalBg>
  );
};
