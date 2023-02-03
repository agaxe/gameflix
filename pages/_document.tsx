import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { ServerStyleSheet } from 'styled-components';
import { SITE_KO_NAME } from '@/common/variables';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_PRIMARY, COLOR_BLACK } = VAR_COLOR;

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => {
        return (
          originalRenderPage({
            enhanceApp: (App) => (props) =>
              sheet.collectStyles(<App {...props} />)
          }),
          originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
          })
        );
      };

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            {[
              ...React.Children.toArray(initialProps.styles),
              sheets.getStyleElement()
            ]}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang='ko'>
        <Head>
          <meta charSet='UTF-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap'
            rel='stylesheet'
          />
          {/* favicon */}
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/static/images/favicon/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/static/images/favicon/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/static/images/favicon/favicon-16x16.png'
          />
          <link rel='manifest' href='/static/images/favicon/site.webmanifest' />
          <link
            rel='mask-icon'
            href='/static/images/favicon/safari-pinned-tab.svg'
            color={COLOR_PRIMARY}
          />
          <meta name='msapplication-TileColor' content={COLOR_BLACK} />
          <meta name='theme-color' content={COLOR_BLACK} />
          <title>{SITE_KO_NAME}</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
