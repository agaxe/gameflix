import React, { useEffect } from "react";
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { css, createGlobalStyle } from "styled-components";
import { global, reset } from '../static/styles';

// ? 스토리북 마크다운 스타일 
const MarkdownStyle = css`
// 리스트 disc
.sbdocs{
	list-style:disc !important;
}
`
// ? 글로벌 스타일
const GlobalStyle = createGlobalStyle`
	${global}
	${reset}
	${MarkdownStyle}
`

export const decorators = [
	(Story) => (
		<RouterContext.Provider value={{
			push: () => Promise.resolve(),
			replace: () => Promise.resolve(),
			prefetch: () => Promise.resolve()
		}}>
			<GlobalStyle />
			<Story />
		</RouterContext.Provider>
	),
];