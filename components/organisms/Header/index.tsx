import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Logo } from '@/components/atoms/Logo';
import { Gnb, SearchInput } from '@/components/molecules';
import { VAR_COLOR, VAR_SIZE } from '@/static/styles/variable';

const { HEADER_HEIGHT } = VAR_SIZE;
const { COLOR_BLACK } = VAR_COLOR;

// * type
type HeaderProps = {
  className?: string;
};

// * component
function HeaderComp({ className }: HeaderProps) {
  const router = useRouter();

  // 검색 버튼 클릭
  function searchClick(query) {
    if (query) {
      router
        .push({
          pathname: `/search`,
          query: { q: query }
        })
        .then(() => window.scrollTo(0, 0));
    } else {
      alert('검색어를 입력 해주세요');
    }
  }

  return (
    <Header className={className}>
      <Logo />
      <SearchInputComp onClick={searchClick} />
      <Gnb />
    </Header>
  );
}
export default HeaderComp;

// * defaultProps
HeaderComp.defaultProps = {
  fixed: true
};

// 헤더 스타일
const Header = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  background: ${COLOR_BLACK};
  height: ${HEADER_HEIGHT};
  display: flex;
  align-items: center;
  padding: 0 50px;
  box-sizing: border-box;
  svg {
    width: 20px;
    height: 20px;
  }
`;

// 헤더 - 검색 input
const SearchInputComp = styled(SearchInput)`
  margin-left: 20%;
  width: 450px;
  input {
    background: #8c8c8c;
    color: #d7d7d7;
    &:focus {
      background: #9c9c9c;
    }
    &::placeholder {
      color: #d7d7d7;
    }
  }
  svg {
    color: #d7d7d7;
  }
`;
