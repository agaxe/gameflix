import React from 'react';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

interface IconProps {
  className?: string;
  name: string;
}

export const Icon = ({ className = '', name }: IconProps) => {
  return (
    <ScIcon
      className={className}
      name={name}
      src={`/static/icons/icon_${name}.svg`}
      uniquifyIDs={true}
    />
  );
};

export const ScIcon = styled(SVG)`
  height: auto;
  display: block;
  fill: inherit;
`;
