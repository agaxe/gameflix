import React from 'react';
import { ItemProps } from './interface';

export const Item = ({ children, dataName, dataValue, ...rest }: ItemProps) => {
  return (
    <li data-name={dataName} data-value={dataValue} {...rest}>
      {children}
    </li>
  );
};
