import { initialValues, validationSchema } from "../../../lib/formValuesPublish";

import { Formik } from "formik";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import styles from "../../../src/styles/Publish.module.css";

import axios from "axios";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Select,
  Typography,
  Input,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import TemplateDefault from "../../../src/templates/Default";
import FileUpload from "../../../src/components/FileUpload";
import useToasty from "../../../src/contexts/Toasty";

const Publish = ({ userId, image }) => {
  const theme = useTheme();

  const { setToasty } = useToasty();
  const router = useRouter();

  const formValues = {
    ...initialValues,
  };
  formValues.userId = userId;
  formValues.image = image;

  const handleSuccess = () => {
    setToasty({
      open: true,
      text: "Anúncio cadastrado com sucesso",
      severity: "success",
    });

    router.push("/user/dashboard");
  };

  const handleError = () => {
    setToasty({
      open: true,
      text: "Ocorreu um erro ao cadastrar produto",
      severity: "success",
    });
  };

  const handleFormSubmit = (values) => {
    const formData = new FormData();

    for (let field in values) {
      if (field === "files") {
        values.files.forEach((file) => {
          formData.append("files", file);
        });
      } else {
        formData.append(field, values[field]);
      }
    }

    axios
      .post("/api/products/add", formData)
      .then(handleSuccess)
      .catch(handleError);
  };

  const backgroundColor = theme.palette.background.white;

  return (
    <TemplateDefault>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="primary">
          Publicar Anúncio
        </Typography>
        <Typography component="h1" variant="h5" align="center" color="primary">
          Quanto mais detalhado, melhor!
        </Typography>
      </Container>
      <br />
      <br />
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          touched,
          values,
          errors,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Input type="hidden" name="userId" value={values.userId} />
              <Input type="hidden" name="image" value={values.image} />

              <Container
                maxWidth="md"
                style={{ marginBottom: theme.spacing(3) }}
              >
                <Box
                  style={{
                    backgroundColor: backgroundColor,
                    padding: theme.spacing(3),
                  }}
                >
                  <FormControl error={errors.title && touched.title} fullWidth>
                    <InputLabel className={styles.inputLabel}>
                      Titulo do Anúncio
                    </InputLabel>
                    <Input
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.title && touched.title ? errors.title : null}
                    </FormHelperText>
                  </FormControl>

                  <br />
                  <br />

                  <FormControl
                    error={errors.category && touched.category}
                    fullWidth
                  >
                    <InputLabel className={styles.inputLabel}>
                      Categoria
                    </InputLabel>
                    <Select
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      label="Categoria"
                      fullWidth
                    >
                      <MenuItem value={"Bebê e Criança"}>
                        Bebê e Criança
                      </MenuItem>
                      <MenuItem value={"Agricultura"}>Agricultura</MenuItem>
                      <MenuItem value={"Moda"}>Moda</MenuItem>
                      <MenuItem value={"Carros, Motos e Barcos"}>
                        Carros, Motos e Barcos
                      </MenuItem>
                      <MenuItem value={"Serviços"}>Serviços</MenuItem>
                      <MenuItem value={"Lazer"}>Lazer</MenuItem>
                      <MenuItem value={"Animais"}>Animais</MenuItem>
                      <MenuItem value={"Móveis, Casa e Jardim"}>
                        Móveis, Casa e Jardim
                      </MenuItem>
                      <MenuItem value={"Imóveis"}>Imóveis</MenuItem>
                      <MenuItem value={"Equipamentos e Ferramentas"}>
                        Equipamentos e Ferramentas
                      </MenuItem>
                      <MenuItem value={"Celulares e Tablets"}>
                        Celulares e Tablets
                      </MenuItem>
                      <MenuItem value={"Esporte"}>Esporte</MenuItem>
                      <MenuItem value={"Tecnologia"}>Tecnologia</MenuItem>
                      <MenuItem value={"Emprego"}>Emprego</MenuItem>
                      <MenuItem value={"Outros"}>Outros</MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.category && touched.category
                        ? errors.category
                        : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container
                maxWidth="md"
                style={{ marginBottom: theme.spacing(3) }}
              >
                <Box
                  style={{
                    backgroundColor: backgroundColor,
                    padding: theme.spacing(3),
                  }}
                >
                  <FileUpload
                    files={values.files}
                    errors={errors.files}
                    touched={touched.files}
                    setFieldValue={setFieldValue}
                  />
                </Box>
              </Container>
              <Container
                maxWidth="md"
                style={{ marginBottom: theme.spacing(3) }}
              >
                <Box
                  style={{
                    backgroundColor: backgroundColor,
                    padding: theme.spacing(3),
                  }}
                >
                  <FormControl
                    error={errors.description && touched.description}
                    fullWidth
                  >
                    <InputLabel className={styles.inputLabel}>
                      Escreva os detalhes do que está vendendo.
                    </InputLabel>
                    <Input
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      multiline
                      rows={6}
                      variant="outlined"
                    />
                    <FormHelperText>
                      {errors.description && touched.description
                        ? errors.description
                        : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container
                maxWidth="md"
                style={{ marginBottom: theme.spacing(3) }}
              >
                <Box
                  style={{
                    backgroundColor: backgroundColor,
                    padding: theme.spacing(3),
                  }}
                >
                  <FormControl error={errors.price && touched.price} fullWidth>
                    <InputLabel className={styles.inputLabel}>
                      Preço.
                    </InputLabel>
                    <Input
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      startAdornment={
                        <InputAdornment position="start">R$</InputAdornment>
                      }
                      variant="outlined"
                    />
                    <FormHelperText>
                      {errors.price && touched.price ? errors.price : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container
                maxWidth="md"
                style={{ marginBottom: theme.spacing(3) }}
              >
                <Box
                  style={{
                    backgroundColor: backgroundColor,
                    padding: theme.spacing(3),
                  }}
                >
                  <Typography
                    component="h6"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Dados de Contato
                  </Typography>
                  <FormControl error={errors.name && touched.name} fullWidth>
                    <InputLabel className={styles.inputLabel}>Nome</InputLabel>
                    <Input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.name && touched.name ? errors.name : null}
                    </FormHelperText>
                  </FormControl>

                  <br />
                  <br />

                  <FormControl error={errors.email && touched.email} fullWidth>
                    <InputLabel className={styles.inputLabel}>
                      E-mail
                    </InputLabel>
                    <Input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.email && touched.email ? errors.email : null}
                    </FormHelperText>
                  </FormControl>
                  <br />
                  <br />

                  <FormControl error={errors.phone && touched.phone} fullWidth>
                    <InputLabel className={styles.inputLabel}>
                      Telefone
                    </InputLabel>
                    <Input
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.phone && touched.phone ? errors.phone : null}
                    </FormHelperText>
                  </FormControl>
                  <br />
                  <br />
                </Box>
              </Container>

              <Container
                maxWidth="md"
                style={{ marginBottom: theme.spacing(3) }}
              >
                <Box textAlign="right">
                  {isSubmitting ? (
                    <CircularProgress
                      sx={{ display: "block", margin: "10px auto" }}
                    />
                  ) : (
                    <Button type="submit" variant="contained" color="primary">
                      Publicar Anúncio
                    </Button>
                  )}
                </Box>
              </Container>
            </form>
          );
        }}
      </Formik>
    </TemplateDefault>
  );
};

Publish.requireAuth = true;

export async function getServerSideProps({ req }) {
  const { accessToken, user } = await getSession({ req });

  let token = "";
  accessToken ? (token = accessToken) : (token = user.email);

  let img = "";
  user.image ? (img = user.image) : (img = null);

  return {
    props: {
      userId: token,
      image: img,
    },
  };
}

export default Publish;
