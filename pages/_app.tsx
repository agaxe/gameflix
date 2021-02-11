import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from "styled-components"
import type { } from 'styled-components/cssprop';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Header, Footer } from 'components/organisms';
import { LoadingModal } from 'components/molecules';
import { VAR_COLOR } from 'static/styles/variable';
const { COLOR_PRIMARY, COLOR_BLACK } = VAR_COLOR;
import { global, reset } from 'static/styles';
import dotenv from 'dotenv'
dotenv.config()
import router from 'next/router';

// * common style
const GlobalStyle = createGlobalStyle`
	${reset}
	${global}
`

// * component
function App({ Component, pageProps }: AppProps) {

	const [LoadingState, setLoadingState] = useState(false);
	const SITE_KO_NAME = process.env.SITE_KO_NAME;

	// 페이지 로딩 인디케이터  
	const LodingStartFunc = (url) => {
		setLoadingState(true)
	}
	const LodingEndFunc = (url) => {
		setLoadingState(false)
	}
	useEffect(() => {
		router.events.on("routeChangeStart", LodingStartFunc);
		router.events.on('routeChangeComplete', LodingEndFunc)
		return () => {
			router.events.off("routeChangeStart", LodingStartFunc);
			router.events.off('routeChangeComplete', LodingEndFunc)
		}
	}, [])


	// error code
	const { statusCode } = pageProps;

	return (
		<div id="wrap">
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
				{/* favicon */}
				<link rel="apple-touch-icon" sizes="180x180" href="/static/images/favicon/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicon/favicon-16x16.png" />
				<link rel="manifest" href="/static/images/favicon/site.webmanifest" />
				<link rel="mask-icon" href="/static/images/favicon/safari-pinned-tab.svg" color={COLOR_PRIMARY} />
				<meta name="msapplication-TileColor" content={COLOR_BLACK} />
				<meta name="theme-color" content={COLOR_BLACK} />
				<title>{SITE_KO_NAME}</title>
			</Head>
			{
				LoadingState
					? <LoadingModal />
					: null
			}
			{!statusCode && <GlobalStyle />}
			{!statusCode && <Header />}
			<Component {...pageProps} />
			{!statusCode && <Footer />}
		</div>
	)
}
export default App;
