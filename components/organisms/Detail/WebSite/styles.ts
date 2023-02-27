import styled from 'styled-components';

export const WebSiteList = styled.ul`
  flex-wrap: wrap;
  width: 50%;
  display: grid;
  grid-template-columns: repeat(3, minmax(10px, 200px));
  gap: 16px 24px;
  & > li {
    width: 33%;
    display: flex;
    align-items: center;

    a {
      display: flex;
      align-items: center;
      font-weight: 300;
      svg {
        margin-left: 5px;
        color: '#9B9B9B';
      }
    }
  }
`;
