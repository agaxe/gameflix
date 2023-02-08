import styled from 'styled-components';

export const PageTitleBox = styled.div`
  position: relative;
`;
export const Line = styled.span`
  display: block;
  width: 100%;
  height: 1px;
  background: #c4c4c4;
  margin-top: 30px;
`;
export const PageTitleIcons = styled.div`
  position: absolute;
  right: 0;
  top: 10px;
  svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;
