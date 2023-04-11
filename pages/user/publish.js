import { Box, Button, Container, Select, TextField, Typography } from '@mui/material'

import TemplateDefault from '../../src/templates/Default'

import { useTheme } from '@mui/material/styles'

const Publish = () => {
    const theme = useTheme()

    const backgroundColor = theme.palette.background.white
    return (
        <TemplateDefault>
            <Container maxWidth="sm" sx={{marginTop: "100px"}} >
                <Typography component="h1" variant='h2' align='center' color="primary">
                    Publicar Anúncio
                </Typography>
                <Typography component="h1" variant='h5' align='center' color="primary">
                    Quanto mais detalhado, melhor!
                </Typography>
            </Container>

            <Container maxWidth="md" style={{marginBottom: theme.spacing(3)}}>
                <Box style={{backgroundColor: backgroundColor, padding: theme.spacing(3)}}>
                    <Typography component="h6" variant='h6'  color="primary">
                        Titulo do Anúncio
                    </Typography>
                    <TextField
                        label="ex.: Bicicleta Aro 18 com Garantia"
                        size='small'
                        fullWidth
                    />
                    <br /><br />
                    <Typography component="h6" variant='h6'  color="primary">
                        Categoria
                    </Typography>
                    <Select
                        native
                        value=""
                        fullWidth
                        onChange={() => {}}
                        inputProps={{
                            name: 'age',
                        }}
                    >
                        <option value="">Selecione</option>
                        <option value={1}>Bebê e Criança</option>
                        <option value={2}>Agricultura</option>
                        <option value={3}>Moda</option>
                        <option value={3}>Carros, Motos e Barcos</option>
                        <option value={3}>Serviços</option>
                        <option value={3}>Lazer</option>
                        <option value={3}>Animais</option>
                        <option value={3}>Móveis, Casa e Jardim</option>
                        <option value={3}>Imóveis</option>
                        <option value={3}>Equipamentos e Ferramentas</option>
                        <option value={3}>Celulares e Tablets</option>
                        <option value={3}>Esporte</option>
                        <option value={3}>Tecnologia</option>
                        <option value={3}>Emprego</option>
                        <option value={3}>Outros</option>
                     </Select>
                </Box>
            </Container>

            <Container maxWidth="md" style={{marginBottom: theme.spacing(3)}}>
                <Box style={{backgroundColor: backgroundColor, padding: theme.spacing(3)}}>
                    <Typography component="h6" variant='h6'  color="primary">
                        Imagens
                    </Typography>
                    <Typography component="div" variant='body2'  color="primary">
                        A primeira imagem é a foto principal do seu anúncio.
                    </Typography>
                </Box>
            </Container>

            <Container maxWidth="md" style={{marginBottom: theme.spacing(3)}}>
                <Box style={{backgroundColor: backgroundColor, padding: theme.spacing(3)}}>
                    <Typography component="h6" variant='h6'  color="primary">
                        Descrição
                    </Typography>
                    <Typography component="div" variant='body2'  color="primary">
                        Escreva os detalhes do que está vendendo.
                    </Typography>
                    <TextField
                        multiline
                        rows={6}
                        variant='outlined'
                        fullWidth
                    />
                </Box>
            </Container>

            <Container maxWidth="md" style={{marginBottom: theme.spacing(3)}}>
                <Box style={{backgroundColor: backgroundColor, padding: theme.spacing(3)}}>
                    <Typography component="h6" variant='h6'  color="primary" gutterBottom>
                        Dados de Contato
                    </Typography>
                    <TextField
                        label="Nome"
                        size='small'
                        variant='outlined'
                        fullWidth
                    />
                    <br /><br />
                    <TextField
                        label="E-mail"
                        size='small'
                        variant='outlined'
                        fullWidth
                    />
                    <br /><br />
                    <TextField
                        label="Telefone"
                        size='small'
                        variant='outlined'
                        fullWidth
                    />
                    <br /><br />
                </Box>
            </Container>

            <Container maxWidth="md" style={{marginBottom: theme.spacing(3)}}>
                <Box textAlign="right">
                    <Button variant='contained' color='primary'>
                        Publicar Anúncio
                    </Button>
                </Box>
            </Container>
        </TemplateDefault>
    )
}

export default Publish