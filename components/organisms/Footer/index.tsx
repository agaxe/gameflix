import React from 'react';
import { pxToRem } from 'static/styles/common';
import { VAR_COLOR } from 'static/styles/variable';
import styled from 'styled-components';

const { COLOR_BLACK } = VAR_COLOR;

// * component
function FooterComp() {
  const SITE_EN_NAME = process.env.SITE_EN_NAME || '';
  const currentYear = new Date().getFullYear().toString();

  return (
    <Footer>
      <p>
        {currentYear} {SITE_EN_NAME.toUpperCase()}
      </p>
    </Footer>
  );
}
export default FooterComp;

// * style
const Footer = styled.footer`
  background: ${COLOR_BLACK};
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: ${pxToRem(24)};
    letter-spacing: 0.425em;
    color: #5a5a5a;
  }
`;
