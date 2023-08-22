import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { ToastyProvider } from "../src/contexts/Toasty";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../src/themes";
import { SessionProvider } from "next-auth/react";
import CheckAuth from "../src/components/CheckAuth";

import { ColorModeProvider } from "@/src/contexts/ColorModeContext";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={pageProps.session}>
      <ColorModeProvider>
        <ToastyProvider>
          <CssBaseline />
          {Component.requireAuth ? (
            <CheckAuth Component={Component} pageProps={pageProps} />
          ) : (
            <Component {...pageProps} />
          )}
        </ToastyProvider>
      </ColorModeProvider>
    </SessionProvider>
  );
}
