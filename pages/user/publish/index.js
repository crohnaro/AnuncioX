import { 
  initialValues, 
  validationSchema 
} from './formValues'

import { Formik } from "formik";
import { useTheme } from "@mui/material/styles";

import styles from '../../../src/styles/Publish.module.css'

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
  MenuItem
} from "@mui/material";

import TemplateDefault from "../../../src/templates/Default";
import FileUpload from '../../../src/components/FileUpload';

const Publish = () => {
  const theme = useTheme();

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
        initialValues={initialValues}
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
                   <FileUpload
                    files={values.files}
                    errors={errors.files}
                    touched={touched.files}
                    setFieldValue={setFieldValue}
                   />

                   
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

Publish.requireAuth = true

export default Publish;
