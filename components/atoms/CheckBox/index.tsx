import React from 'react';
import { MdCheck } from 'react-icons/md';
import * as S from './styles';

export const CheckBox = ({ id, ...rest }) => {
  return (
    <>
      <S.CheckBox id={id} {...rest} />
      <label htmlFor={id}>
        <MdCheck />
      </label>
    </>
  );
};
