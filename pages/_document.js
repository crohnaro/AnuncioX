import * as React from 'react';
import PropTypes from 'prop-types';
import Document, { Html, Head, Main, NextScript } from 'next/document';


export default function MyDocument() {

  return (
    <Html lang="pt-BR">
      <Head>
        {/* PWA primary color */}
        
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}