import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import { 
  Button,
  Container, 
  Grid, 
  Typography 
} from '@mui/material'

import TemplateDefault from '../../src/templates/Default'

import Card from '../../src/components/Card'


 const Home =() => {
  return (
    
    <>
      <TemplateDefault>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align='center'>Meus Anúncios</Typography>
          <Button variant="contained" color='primary' sx={{margin:"30px auto", display:"block"}}>Publicar novo Anúncio</Button>
        </Container>
        <Container maxWidth="md" sx={{ marginTop:"100px"}}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                image={'https://picsum.photos/200/300'}
                title={'Produto X'}
                subtitle={'R$ 60,00'}
                actions={
                  <>
                    <Button size="small" color="primary">Editar</Button>
                    <Button size="small" color="primary">Remover</Button>
                  </>
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                  image={'https://picsum.photos/200/300'}
                  title={'Produto X'}
                  subtitle={'R$ 60,00'}
                  actions={
                    <>
                      <Button size="small" color="primary">Editar</Button>
                      <Button size="small" color="primary">Remover</Button>
                    </>
                  }
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                  image={'https://picsum.photos/200/300'}
                  title={'Produto X'}
                  subtitle={'R$ 60,00'}
                  actions={
                    <>
                      <Button size="small" color="primary">Editar</Button>
                      <Button size="small" color="primary">Remover</Button>
                    </>
                  }
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                  image={'https://picsum.photos/200/300'}
                  title={'Produto X'}
                  subtitle={'R$ 60,00'}
                  actions={
                    <>
                      <Button size="small" color="primary">Editar</Button>
                      <Button size="small" color="primary">Remover</Button>
                    </>
                  }
                />
            </Grid>
          </Grid>
        </Container>
      </TemplateDefault>
    </>
  )
}

Home.requireAuth = true

export default Home