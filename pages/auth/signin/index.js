import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";

import GoogleIcon from "@/public/google-logo.svg";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";

import { Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { initialValues, validationSchema } from "../../../lib/formValuesSignin";
import { useState } from "react";

import logob from "../../../public/logo-black.png";
import logow from "../../../public/logo-white.png";

const handleGoogleLogin = () => {
  signIn("google", {
    callbackUrl: "/user/dashboard",
  });
};

const handleAuthentication = async (values) => {
  try {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/user/dashboard",
    });
    return response;
  } catch (error) {
    console.error("Erro durante a autenticação:", error);
    throw error;
  }
};



const Signuptest = () => {
  const [logoMode, setLogoMode] = useState("light")
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "40vw", // must be `vw` only
            "--Form-maxWidth": "700px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255 255 255 / 0.6)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
                alignItems: "center",
                padding: "10px",
              }}
              href={"/"}
            >
              <Image alt="anunX Logo" width={64} priority src={logob} />
            </Link>
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <div>
              <Typography component="h1" fontSize="xl2" fontWeight="lg">
                Entre em sua conta
              </Typography>
              <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
                Seja bem-vindo!
              </Typography>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  // Defina isSubmitting como true ao iniciar o envio
                  setSubmitting(true);

                  // Chame a função de autenticação
                  await handleAuthentication(values);

                  // Após o envio bem-sucedido, defina isSubmitting como false
                  setSubmitting(false);
                } catch (error) {
                  // Em caso de erro, também defina isSubmitting como false
                  setSubmitting(false);
                }
              }}
            >
              {({
                touched,
                values,
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <FormControl required error={errors.email && touched.email}>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl
                      required
                      error={errors.password && touched.password}
                    >
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        fontSize="sm"
                        href="/auth/signup"
                        fontWeight="lg"
                      >
                        Ainda não tem conta? Registre-se!
                      </Link>
                    </Box>
                    {isSubmitting ? (
                      <Button
                        loading
                        loadingPosition="end"
                        endDecorator={<SendIcon />}
                        variant="solid"
                      >
                        Entrando
                      </Button>
                    ) : (
                      <Button type="submit" fullWidth>
                        Entrar
                      </Button>
                    )}
                  </form>
                );
              }}
            </Formik>

            <Button
              variant="outlined"
              color="neutral"
              fullWidth
              onClick={handleGoogleLogin}
              startDecorator={
                <Image src={GoogleIcon} width={16} height={16} alt="logo" />
              }
            >
              Entre com Google
            </Button>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © AnunX {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1551825687-f9de1603ed8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80)",
          },
        })}
      />
    </CssVarsProvider>
  );
};

export default Signuptest;
