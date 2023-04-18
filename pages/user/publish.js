import { useState } from "react";

import { useTheme } from "@mui/material/styles";

import { DeleteForever } from "@mui/icons-material";

import { useDropzone } from "react-dropzone";

import styles from '../../src/styles/Publish.module.css'


import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  Input,
  MenuItem
} from "@mui/material";

import TemplateDefault from "../../src/templates/Default";
import { Formik } from "formik";
import * as yup from "yup"

const Publish = () => {
  const theme = useTheme();

  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": []
    },
    onDrop: (acceptedFile) => {
      const newFiles = acceptedFile.map((file) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });

      setFiles([...files, ...newFiles]);
    },
  });

  const validationSchema = yup.object().shape({
    title: yup.string()
      .min(6, 'Escreva um titulo maior')
      .max(100, 'Titulo muito grande')
      .required('Campo obrigatório'),
    
    category: yup.string().required('Campo obrigatório'),
  })

  const handleRemoveFile = fileName => {
    const newFileState = files.filter(file => file.name !== fileName)
    setFiles(newFileState)
  }

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
      <br /><br />
      <Formik
        initialValues={{
          title: '',
          category: '',
        }}
        validationSchema={validationSchema}
        onSubmit={() => {
          console.log('ok enviou o form', values)
        }}
      >
        {
          ({
            values,
            errors,
            handleChange,
            handleSubmit
          }) => {
            console.log(errors)
            return (
              <form onSubmit={handleSubmit}>
                <Container maxWidth="md" style={{ marginBottom: theme.spacing(3) }}>
                  <Box
                    style={{
                      backgroundColor: backgroundColor,
                      padding: theme.spacing(3),
                    }}
                  >
                    <Typography component="h6" variant="h6" color="primary">
                      Titulo do Anúncio
                    </Typography>
                    <TextField
                      name="title"
                      value={values.title}
                      label="ex.: Bicicleta Aro 18 com Garantia"
                      size="small"
                      fullWidth
                      onChange={handleChange}
                      error={errors.title}
                      helperText={errors.title}
                    />
                    <br />
                    <br />
                    <Typography component="h6" variant="h6" color="primary">
                      Categoria
                    </Typography>
                    <FormControl error={errors.category} fullWidth>
                      <Select
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        fullWidth
                      >

                        <MenuItem value={"Bebê e Criança"}>Bebê e Criança</MenuItem>
                        <MenuItem value={"Agricultura"}>Agricultura</MenuItem>
                        <MenuItem value={"Moda"}>Moda</MenuItem>
                        <MenuItem value={"Carros, Motos e Barcos"}>Carros, Motos e Barcos</MenuItem>
                        <MenuItem value={"Serviços"}>Serviços</MenuItem>
                        <MenuItem value={"Lazer"}>Lazer</MenuItem>
                        <MenuItem value={"Animais"}>Animais</MenuItem>
                        <MenuItem value={"Móveis, Casa e Jardim"}>Móveis, Casa e Jardim</MenuItem>
                        <MenuItem value={"Imóveis"}>Imóveis</MenuItem>
                        <MenuItem value={"Equipamentos e Ferramentas"}>Equipamentos e Ferramentas</MenuItem>
                        <MenuItem value={"Celulares e Tablets"}>Celulares e Tablets</MenuItem>
                        <MenuItem value={"Esporte"}>Esporte</MenuItem>
                        <MenuItem value={"Tecnologia"}>Tecnologia</MenuItem>
                        <MenuItem value={"Emprego"}>Emprego</MenuItem>
                        <MenuItem value={"Outros"}>Outros</MenuItem>
                      </Select>
                      <FormHelperText>
                        { errors.category}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Container>

                <Container maxWidth="md" style={{ marginBottom: theme.spacing(3) }}>
                  <Box
                    style={{
                      backgroundColor: backgroundColor,
                      padding: theme.spacing(3),
                    }}
                  >
                    <Typography component="h6" variant="h6" color="primary">
                      Imagens
                    </Typography>
                    <Typography component="div" variant="body2" color="primary">
                      A primeira imagem é a foto principal do seu anúncio.
                    </Typography>
                    <Box className={styles.thumbsContainer}>
                      <Box
                        sx={{ backgroundColor: theme.palette.background.default }}
                        className={styles.dropzone}
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <Typography variant="body2" color="primary">
                          Clique para adicionar ou arraste a imagem para aqui.
                        </Typography>
                      </Box>
                      {
                        files.map((file, index) => (
                          <Box key={file.name} className={styles.thumb} style={{ backgroundImage: `url(${file.preview})` }}>
                            {index === 0 ? (
                              <Box className={styles.mainImage}>
                                <Typography variant="body2" color="secondary">
                                  Principal
                                </Typography>
                              </Box>
                            ) : null}
                            <Box className={styles.mask}>
                              <IconButton color="secondary" onClick={() => handleRemoveFile(file.name)}>
                                <DeleteForever fontSize="large" />
                              </IconButton>
                            </Box>
                          </Box>
                        ))
                      }
                    </Box>
                  </Box>
                </Container>
                <Container maxWidth="md" style={{ marginBottom: theme.spacing(3) }}>
                  <Box
                    style={{
                      backgroundColor: backgroundColor,
                      padding: theme.spacing(3),
                    }}
                  >
                    <Typography component="h6" variant="h6" color="primary">
                      Descrição
                    </Typography>
                    <Typography component="div" variant="body2" color="primary">
                      Escreva os detalhes do que está vendendo.
                    </Typography>
                    <TextField multiline rows={6} variant="outlined" fullWidth />
                  </Box>
                </Container>

                <Container maxWidth="md" style={{ marginBottom: theme.spacing(3) }}>
                  <Box
                    style={{
                      backgroundColor: backgroundColor,
                      padding: theme.spacing(3),
                    }}
                  >
                    <Typography component="h6" variant="h6" color="primary">
                      Preço
                    </Typography>
                    <br />
                    <FormControl fullWidth>
                      <InputLabel htmlFor="outlined-adornment-valor">Valor</InputLabel>
                      <OutlinedInput
                        onChange={() => { }}
                        startAdornment={<InputAdornment position="start" >R$</InputAdornment>}
                        label="Valor"
                      />
                    </FormControl>
                  </Box>
                </Container>

                <Container maxWidth="md" style={{ marginBottom: theme.spacing(3) }}>
                  <Box
                    style={{
                      backgroundColor: backgroundColor,
                      padding: theme.spacing(3),
                    }}
                  >
                    <Typography component="h6" variant="h6" color="primary" gutterBottom>
                      Dados de Contato
                    </Typography>
                    <TextField label="Nome" size="small" variant="outlined" fullWidth />
                    <br />
                    <br />
                    <TextField label="E-mail" size="small" variant="outlined" fullWidth />
                    <br />
                    <br />
                    <TextField
                      label="Telefone"
                      size="small"
                      variant="outlined"
                      fullWidth
                    />
                    <br />
                    <br />
                  </Box>
                </Container>

                <Container maxWidth="md" style={{ marginBottom: theme.spacing(3) }}>
                  <Box textAlign="right">
                    <Button type="submit" variant="contained" color="primary">
                      Publicar Anúncio
                    </Button>
                  </Box>
                </Container>
              </form>
            )
          }
        }
      </Formik>
    </TemplateDefault>
  );
};

export default Publish;
