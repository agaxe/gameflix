import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import router from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createGlobalStyle } from 'styled-components';
import type {} from 'styled-components/cssprop';
import { LoadingModal } from '@/components/molecules/LoadingModal';
import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';
import { SITE_KO_NAME } from '@/common/variables';
import { global, reset } from '@/static/styles';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_BLACK } = VAR_COLOR;

const GlobalStyle = createGlobalStyle`
	${reset}
	${global}
`;

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const [LoadingState, setLoadingState] = useState(false);

  // 페이지 로딩 인디케이터
  const LodingStartFunc = () => setLoadingState(true);
  const LodingEndFunc = () => setLoadingState(false);

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
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{SITE_KO_NAME}</title>
        <meta name='msapplication-TileColor' content={COLOR_BLACK} />
        <meta name='theme-color' content={COLOR_BLACK} />
      </Head>
      <div id='wrap'>
        {LoadingState ? <LoadingModal /> : null}
        {!statusCode && <GlobalStyle />}
        {!statusCode && <Header />}
        <Component {...pageProps} />
        {!statusCode && <Footer />}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
