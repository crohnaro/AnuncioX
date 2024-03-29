import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/router";
import {
  Typography,
  Box,
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  InputAdornment,
  FormHelperText,
  Input,
  CircularProgress,
  Paper,
} from "@mui/material";

import TemplateDefault from "../../../src/templates/Default";
import { validationSchema } from "../../../lib/formValuesEdit";
import useToast from "../../../src/contexts/Toasty";
import { getSession } from "next-auth/react";
import ProductsModel from "../../../src/models/products";
import { FileUpload } from "@mui/icons-material";

const Edit = ({ userId, image, product }) => {
  const router = useRouter();
  const { setToasty } = useToast();

  const localFiles = [];

  product.files.map((file) => {
    localFiles.push({
      path: file.name,
      preview: file.url,
    });
  });

  const initialValues = {
    title: product.title,
    category: product.category,
    description: product.description,
    price: product.price,
    name: product.user.name,
    email: product.user.email,
    phone: product.user.phone,
    files: localFiles,
    locationCity: product.locationCity,
    locationState: product.locationState,
    publishDate: product.publishDate || "22/09/2022",
  };
  const formValues = {
    ...initialValues,
  };

  formValues.userId = userId;
  formValues.image = image;

  const handleSuccess = () => {
    setToasty({
      open: true,
      text: "Anúncio editado com sucesso",
      severity: "success",
    });

    router.push("/user/dashboard");
  };

  const handleError = (error) => {
    setToasty({
      open: true,
      text: "Ops, ocorreu um erro. Tente novamente.",
      severity: "error",
    });
    console.log(error);
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
      .put(`/api/products/update/${product._id}`, formData)
      .then(handleSuccess)
      .catch((error) => handleError(error));
  };

  return (
    <TemplateDefault>
      <Container maxWidth="lg" sx={{ marginBottom: 3 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
        >
          Editando Anúncio
        </Typography>
        <Typography
          component="h5"
          variant="h4"
          align="center"
          color="textPrimary"
        >
          {product.title}
        </Typography>
      </Container>

      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
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
              <Input
                type="hidden"
                name="publishDate"
                value={values.publishDate}
              />
              <Input type="hidden" name="productId" value={product._id} />

              <Container sx={{ paddingBottom: 3 }}>
                <Box
                  component={Paper}
                  elevation={0}
                  sx={{ paddingX: 3, paddingTop: 3 }}
                >
                  <Box sx={{ paddingBottom: 3 }}>
                    <Typography
                      component="h6"
                      gutterBottom
                      variant="h6"
                      color="textPrimary"
                    >
                      Título do Anúncio
                    </Typography>
                    <FormControl
                      error={errors.title && touched.title}
                      fullWidth
                    >
                      <InputLabel size="small">
                        Ex: Xbox One Series S
                      </InputLabel>
                      <Input
                        name="title"
                        value={values.title}
                        label="Ex: Xbox One Series S"
                        onChange={handleChange}
                        size="small"
                      />
                      <FormHelperText>
                        {errors.title && touched.title && errors.title}
                      </FormHelperText>
                    </FormControl>
                  </Box>

                  <Box sx={{ minWidth: 120, paddingBottom: 3 }}>
                    <Typography
                      component="h6"
                      gutterBottom
                      variant="h6"
                      color="textPrimary"
                    >
                      Categoria
                    </Typography>
                    <FormControl
                      error={errors.category && touched.category}
                      fullWidth
                    >
                      <InputLabel size="small">Categoria</InputLabel>
                      <Select
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        label="Categoria"
                        fullWidth
                      >
                        <MenuItem value="Computadores">Computadores</MenuItem>
                        <MenuItem value="Eletrônicos e celulares">
                          Eletrônicos e celulares
                        </MenuItem>
                        <MenuItem value="Equipamentos e Ferramentas">
                          Equipamentos e Ferramentas
                        </MenuItem>
                        <MenuItem value="Automotivos">Automotivos</MenuItem>
                        <MenuItem value="Estética">Estética</MenuItem>
                        <MenuItem value="Bebê e Criança">
                          Bebê e Criança
                        </MenuItem>
                        <MenuItem value="Animais">Animais</MenuItem>
                        <MenuItem value="Móveis, Casa e Jardim">
                          Móveis, Casa e Jardim{" "}
                        </MenuItem>
                        <MenuItem value="Esporte">Esporte</MenuItem>
                        <MenuItem value="Lazer">Lazer</MenuItem>
                        <MenuItem value="Outros">Outros</MenuItem>
                      </Select>
                      <FormHelperText>
                        {errors.category && touched.category && errors.category}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Box>
              </Container>

              <Container
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box
                  bgcolor="rgba(0, 0, 0, .8)"
                  sx={{
                    textAlign: "center",
                    borderRadius: 1,
                    position: "absolute",
                    left: "2.2%",
                    width: "95.7%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    color="#fff"
                    component="h6"
                    gutterBottom
                    variant="h6"
                  >
                    Não é possível editar as fotos do seu anúncio
                  </Typography>
                  <Typography
                    color="#fff"
                    component="h6"
                    gutterBottom
                    variant="body2"
                  >
                    Caso seja necessário, crie um novo anúncio
                  </Typography>
                </Box>
                <Box sx={{ opacity: 0.2, cursor: "default" }}>
                  <FileUpload
                    files={values.files}
                    errors={errors.files}
                    touched={touched.files}
                    setFieldValue={setFieldValue}
                  />
                </Box>
              </Container>

              <Container sx={{ paddingY: 3 }}>
                <Box component={Paper} elevation={0} sx={{ paddingX: 3 }}>
                  <Box sx={{ paddingY: 3 }}>
                    <Typography
                      component="h6"
                      gutterBottom
                      variant="h6"
                      color="textPrimary"
                    >
                      Descrição
                    </Typography>
                    <Typography
                      component="div"
                      variant="body2"
                      color="textPrimary"
                    >
                      Escreva os detalhes do que está vendendo
                    </Typography>
                    <FormControl
                      error={errors.description && touched.description}
                      fullWidth
                    >
                      <Input
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        multiline
                        rows={6}
                        variant="outlined"
                      />
                      <FormHelperText>
                        {errors.description &&
                          touched.description &&
                          errors.description}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Box>
              </Container>

              <Container sx={{ paddingBottom: 3 }}>
                <Box component={Paper} elevation={0} sx={{ paddingX: 3 }}>
                  <Box sx={{ paddingY: 3 }}>
                    <Typography
                      component="h6"
                      gutterBottom
                      variant="h6"
                      color="textPrimary"
                    >
                      Preço
                    </Typography>
                    <FormControl
                      fullWidth
                      error={errors.price && touched.price}
                    >
                      <InputLabel>Valor</InputLabel>
                      <Input
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        startAdornment={
                          <InputAdornment position="start">R$</InputAdornment>
                        }
                      />
                      <FormHelperText>
                        {errors.price && touched.price && errors.price}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Box>
              </Container>

              <Container sx={{ paddingBottom: 3 }}>
                <Box component={Paper} elevation={0} sx={{ paddingX: 3 }}>
                  <Box sx={{ paddingY: 3 }}>
                    <Typography
                      component="h6"
                      gutterBottom
                      variant="h6"
                      color="textPrimary"
                    >
                      Dados de Contato
                    </Typography>

                    <FormControl
                      error={errors.name && touched.name}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    >
                      <InputLabel size="small">Nome</InputLabel>
                      <Input
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                        label="Nome"
                        size="small"
                      />
                      <FormHelperText>
                        {errors.name && touched.name && errors.name}
                      </FormHelperText>
                    </FormControl>

                    <FormControl
                      error={errors.email && touched.email}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    >
                      <InputLabel size="small">E-mail</InputLabel>
                      <Input
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        label="E-mail"
                        size="small"
                      />
                      <FormHelperText>
                        {errors.email && touched.email && errors.email}
                      </FormHelperText>
                    </FormControl>

                    <FormControl
                      error={errors.phone && touched.phone}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    >
                      <InputLabel size="small">Telefone</InputLabel>
                      <Input
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        {errors.phone && touched.phone && errors.phone}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Box>
              </Container>

              <Container sx={{ paddingBottom: 3 }}>
                <Box textAlign="right">
                  {isSubmitting ? (
                    <CircularProgress size={30} sx={{ marginRight: 2 }} />
                  ) : (
                    <Button type="submit" color="primary" variant="contained">
                      Atualizar anúncio
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

Edit.requireAuth = true;

export async function getServerSideProps({ req, query }) {
  const { accessToken, user } = await getSession({ req });

  const { idProduct } = query;

  const product = await ProductsModel.findOne({ _id: idProduct });

  let token = "";
  accessToken ? (token = accessToken) : (token = user.email);

  let img = "";
  user.image ? (img = user.image) : (img = null);

  return {
    props: {
      userEmail: token,
      image: img,
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

export default Edit;
