import React from 'react';
import styled from 'styled-components';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_PRIMARY } = VAR_COLOR;

// * type
type SectionTitleProps = {
  /** 타이틀 텍스트 */
  title: string;
};

// * component
function SectionTitleComp({ title }: SectionTitleProps) {
  return (
    <SectionTitle>
      <span></span>
      <h4>{title}</h4>
    </SectionTitle>
  );
}
export default SectionTitleComp;

// * style
const SectionTitle = styled.div`
  display: inline-block;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  span {
    width: 4px;
    height: 26px;
    background: ${COLOR_PRIMARY};
    margin-right: 10px;
  }
`;
