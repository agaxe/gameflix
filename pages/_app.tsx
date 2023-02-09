import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
//import Head from 'next/head';
import router from 'next/router';
//import { VAR_COLOR } from '@/static/styles/variable';
import { createGlobalStyle } from 'styled-components';
import type {} from 'styled-components/cssprop';
//import { SITE_KO_NAME } from '@/common/variables';
import { LoadingModal } from '@/components/molecules/LoadingModal';
import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';
//import dotenv from 'dotenv';
import { global, reset } from '@/static/styles';

//const { COLOR_PRIMARY, COLOR_BLACK } = VAR_COLOR;

//dotenv.config();

// * common style
const GlobalStyle = createGlobalStyle`
	${reset}
	${global}
`;

// * component
function App({ Component, pageProps }: AppProps) {
  const [LoadingState, setLoadingState] = useState(false);

  // 페이지 로딩 인디케이터
  const LodingStartFunc = (url) => {
    setLoadingState(true);
  };
  const LodingEndFunc = (url) => {
    setLoadingState(false);
  };
  useEffect(() => {
    router.events.on('routeChangeStart', LodingStartFunc);
    router.events.on('routeChangeComplete', LodingEndFunc);
    return () => {
      router.events.off('routeChangeStart', LodingStartFunc);
      router.events.off('routeChangeComplete', LodingEndFunc);
    };
  }, []);

  // error code
  const { statusCode } = pageProps;

  return (
    <div id='wrap'>
      {LoadingState ? <LoadingModal /> : null}
      {!statusCode && <GlobalStyle />}
      {!statusCode && <Header />}
      <Component {...pageProps} />
      {!statusCode && <Footer />}
    </div>
  );
}
export default App;
