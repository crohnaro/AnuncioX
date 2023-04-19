import { Formik } from 'formik'
import { useTheme } from "@mui/material/styles";
import { initialValues, validationSchema} from './formValues'
import { Container, Typography, Box, FormControl, InputLabel, Input, FormHelperText, Button } from '@mui/material'
import TemplateDefault from '../../../src/templates/Default'

import styles from '../../../src/styles/Signup.module.css'

const Signup = () => {
    const theme = useTheme();
    const backgroundColor = theme.palette.background.white;
    return (
        <TemplateDefault>
            
            <Container component="main" maxWidth="sm" >
                <Typography component="h1" variant='h2' align="center" color="primary"> 
                    Crie sua conta 
                </Typography>
                <Typography component="h5" variant='h6' align="center" color="primary"> 
                    E anuncie para todo Brasil 
                </Typography>
            </Container>

            <Container maxWidth="md">
                <Box style={{backgroundColor: backgroundColor, padding: theme.spacing(3),}}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) =>{
                            console.log('ok, form enviado', values)
                        }}
                    >
                        {
                            ({
                                touched,
                                values,
                                errors,
                                handleChange,
                                handleSubmit
                            }) => {
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <FormControl fullWidth error={errors.name && touched.name} className={styles.formControl}>
                                            <InputLabel className={styles.inputLabel}>Nome</InputLabel>
                                                <Input 
                                                    name="name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                />
                                                <FormHelperText>
                                                    {errors.name && touched.name ? errors.name : null }
                                                </FormHelperText>
                                        </FormControl>

                                        <FormControl fullWidth error={errors.email && touched.email} className={styles.formControl}>
                                            <InputLabel className={styles.inputLabel}>E-mail</InputLabel>
                                                <Input 
                                                    type='email'
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                                <FormHelperText>
                                                    {errors.email && touched.email ? errors.email : null }
                                                </FormHelperText>
                                        </FormControl>

                                        <FormControl fullWidth error={errors.password && touched.password} className={styles.formControl}>
                                            <InputLabel className={styles.inputLabel}>Senha</InputLabel>
                                                <Input 
                                                    type='password'
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                />
                                                <FormHelperText>
                                                    {errors.password && touched.password ? errors.password : null }
                                                </FormHelperText>
                                        </FormControl>

                                        <FormControl fullWidth error={errors.passwordConf && touched.passwordConf} className={styles.formControl}>
                                            <InputLabel className={styles.inputLabel}>Confirmação de senha</InputLabel>
                                                <Input 
                                                    type='password'
                                                    name="passwordConf"
                                                    value={values.passwordConf}
                                                    onChange={handleChange}
                                                />
                                                <FormHelperText>
                                                    {errors.passwordConf && touched.passwordConf ? errors.passwordConf : null }
                                                </FormHelperText>
                                        </FormControl>

                                        <Button
                                            type='submit'
                                            fullWidth
                                            variant='contained'
                                            color='primary'
                                            className={styles.submit}
                                        >
                                            Cadastrar
                                        </Button>
                                    </form>
                                )
                            }
                        }
                    </Formik>
                </Box>
            </Container>

        </TemplateDefault>
    )
}

export default Signup