import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { ToastyProvider } from '../src/contexts/Toasty'
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../src/theme';
import { SessionProvider } from "next-auth/react"
import CheckAuth from '../src/components/CheckAuth';


export default function MyApp({
  Component, 
  pageProps: {session, ...pageProps},
}) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <ToastyProvider>
          <CssBaseline />
          {
            Component.requireAuth
            ? <CheckAuth Component={Component} pageProps={pageProps} />
            : <Component {...pageProps} />
          }  
        </ToastyProvider>
      </ThemeProvider>
    </SessionProvider>
);
}
  

  


