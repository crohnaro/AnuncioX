import { Formik } from "formik";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { signIn, useSession } from  'next-auth/react'




import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

import { initialValues, validationSchema } from "./formValues";
import TemplateDefault from "../../../src/templates/Default";
import useToasty from "../../../src/contexts/Toasty";
import styles from "../../../src/styles/Signup.module.css";
import Image from "next/image";

const Signin = () => {
  const theme = useTheme();
  const { setToasty } = useToasty();
  const router = useRouter();
  const { data : session }  = useSession();

  console.log(session)

  const handleGoogleLogin = () => {
    signIn('google', {
      callbackUrl: '/user/dashboard',
    })
  }

  const handleFormSubmit = async (values) => {
    signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: '/user/dashboard',
    })
  };

  const backgroundColor = theme.palette.background.white;
  return (
    <TemplateDefault>
      <Container component="main" maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="primary">
          Entre na sua conta
        </Typography>
      </Container>

      <Container maxWidth="md">
        <Box
          style={{
            backgroundColor: backgroundColor,
            padding: theme.spacing(3),
          }}
        >
          <Box display="flex" justifyContent="center">
            <Button 
              variant="contained"
              color="primary"
              onClick={handleGoogleLogin}
              startIcon={
                <Image src="/images/" width={20} height={20} alt="logo"/>
              }>
              Entrar com o Google
            </Button>
          </Box>

          <Box className={styles.boxSeparator}>
            <span>ou</span>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
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
                  {
                    router.query.i === '1'
                    ? (
                      <Alert sx={{marginTop: "20px", marginBottom: "20px"}} severity="error">Usuário ou senha inválidos</Alert>
                    )
                    : null
                  }
                  <FormControl
                    fullWidth
                    error={errors.email && touched.email}
                    className={styles.formControl}
                  >
                    <InputLabel className={styles.inputLabel}>
                      E-mail
                    </InputLabel>
                    <Input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.email && touched.email ? errors.email : null}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={errors.password && touched.password}
                    className={styles.formControl}
                  >
                    <InputLabel className={styles.inputLabel}>Senha</InputLabel>
                    <Input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.password && touched.password
                        ? errors.password
                        : null}
                    </FormHelperText>
                  </FormControl>

                  {isSubmitting ? (
                    <CircularProgress className={styles.loading} />
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={styles.submit}
                    >
                      Entrar
                    </Button>
                  )}
                </form>
              );
            }}
          </Formik>
        </Box>
      </Container>
    </TemplateDefault>
  );
};



export default Signin;
