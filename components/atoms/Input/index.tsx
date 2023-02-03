import React from 'react';
import { InputProps } from './interface';
import * as S from './styles';

// * component
export const Input = ({ ...rest }: InputProps) => {
  return <S.Input {...rest} autoComplete='off' spellCheck='false' />;
};
