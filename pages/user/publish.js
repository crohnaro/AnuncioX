import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup"
import { useDropzone } from "react-dropzone";
import { useTheme } from "@mui/material/styles";

import { DeleteForever } from "@mui/icons-material";

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
  Select,
  Typography,
  Input,
  MenuItem
} from "@mui/material";

import TemplateDefault from "../../src/templates/Default";

const Publish = () => {
  const theme = useTheme();

  const validationSchema = yup.object().shape({
    title: yup.string()
      .min(6, 'Escreva um titulo maior.')
      .max(100, 'Titulo muito grande.')
      .required('Campo obrigatório.'),
    
    category: yup.string()
      .required('Campo obrigatório.'),
    
    description: yup.string()
      .min(50, 'Escreva uma descrição de no mínimo 50 caracteres.')
      .required('Campo obrigatório.'),
    
    price: yup.number()
      .typeError('Você precisa digitar um número.')
      .required('Campo obrigatório.'),

    email: yup.string()
      .email('Digite um e-mail válido.')
      .required('Campo obrigatório.'),
    
    name: yup.string()
      .required('Campo obrigatório.'),
      
    phone: yup.number()
      .required('Campo obrigatório.'),

    files: yup.array()
      .min(1, 'Envie pelo menos uma foto')
      .required('Campo obrigatorio')
  })

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
          description: '',
          price: '',
          email: '',
          name: '',
          phone: '',
          files: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('ok enviou o form', values)
        }}
      >
        {
          ({
            touched,
            values,
            errors,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => {

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

                setFieldValue('files',[...values.files, ...newFiles]);
              },
            });
            const handleRemoveFile = fileName => {
              const newFileState = values.files.filter(file => file.name !== fileName)
              setFieldValue('files', newFileState)
            }

            return (
              <form onSubmit={handleSubmit}>
                <Container maxWidth="md" style={{ marginBottom: theme.spacing(3) }}>
                  <Box
                    style={{
                      backgroundColor: backgroundColor,
                      padding: theme.spacing(3),
                    }}
                  >
                    <FormControl error={errors.title && touched.title} fullWidth>
                      <InputLabel className={styles.inputLabel}>Titulo do Anúncio</InputLabel>
                      <Input
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.title && touched.title ? errors.title : null }
                      </FormHelperText>
                    </FormControl>
                    
                    <br />
                    <br />
                    
                    <FormControl error={errors.category && touched.category } fullWidth>
                      <InputLabel className={styles.inputLabel}>Categoria</InputLabel>
                      <Select
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        label="Categoria"
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
                        {  errors.category && touched.category ? errors.category : null }
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
                    <Typography component="h6" variant="h6" color={errors.files && touched.files ? 'error' : 'primary'}>
                      Imagens
                    </Typography>
                    <Typography component="div" variant="body2" color={errors.files && touched.files ? 'error' : 'primary'}>
                      A primeira imagem é a foto principal do seu anúncio.
                    </Typography>

                    {
                      errors.files && touched.files
                      ? <Typography variant='body2' color="error" gutterBottom>{errors.files}</Typography>
                      : null
                    }

                    <Box className={styles.thumbsContainer}>
                      <Box
                        sx={{ backgroundColor: theme.palette.background.default }}
                        className={styles.dropzone}
                        {...getRootProps()}
                      >
                        <input name="files" {...getInputProps()} />
                        <Typography variant="body2" color={errors.files && touched.files ? 'error' : 'primary'}>
                          Clique para adicionar ou arraste a imagem para aqui.
                        </Typography>
                      </Box>
                      {
                        values.files.map((file, index) => (
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
                    <FormControl error={errors.description && touched.description } fullWidth>
                      <InputLabel className={styles.inputLabel}>Escreva os detalhes do que está vendendo.</InputLabel>
                      <Input
                       name="description"
                       value={values.description}
                       onChange={handleChange}
                       multiline 
                       rows={6} 
                       variant="outlined"  
                       />
                       <FormHelperText>
                         { errors.description && touched.description ? errors.description : null }
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
                    <FormControl error={errors.price && touched.price } fullWidth>
                      <InputLabel className={styles.inputLabel}>Preço.</InputLabel>
                      <Input
                       name="price"
                       value={values.price}
                       onChange={handleChange}
                       startAdornment={<InputAdornment position="start" >R$</InputAdornment>}
                       variant="outlined"  
                       />
                       <FormHelperText>
                         { errors.price && touched.price ? errors.price : null }
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
                    <Typography component="h6" variant="h6" color="primary" gutterBottom>
                      Dados de Contato
                    </Typography>
                    <FormControl error={errors.name && touched.name } fullWidth>
                      <InputLabel className={styles.inputLabel}>Nome</InputLabel>
                      <Input
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.name && touched.name ? errors.name : null  }
                      </FormHelperText>
                    </FormControl>
                    
                    <br />
                    <br />
                    
                    <FormControl error={errors.email && touched.email } fullWidth>
                      <InputLabel className={styles.inputLabel}>E-mail</InputLabel>
                      <Input
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.email && touched.email ? errors.email : null  }
                      </FormHelperText>
                    </FormControl>
                    <br />
                    <br />
                    
                    <FormControl error={errors.phone && touched.phone } fullWidth>
                      <InputLabel className={styles.inputLabel}>Telefone</InputLabel>
                      <Input
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.phone && touched.phone ? errors.phone : null }
                      </FormHelperText>
                    </FormControl>
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
