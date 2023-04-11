import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import { 
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Container, 
  Grid, 
  Typography 
} from '@mui/material'

import TemplateDefault from '../../src/templates/Default'


export default function Home() {
  return (
    
    <>
      <TemplateDefault>
        <Container maxWidth="sm" sx={{ marginTop:"100px"}}>
          <Typography component="h1" variant="h2" align='center'>Meus Anúncios</Typography>
          <Button variant="contained" color='primary' sx={{margin:"30px auto", display:"block"}}>Publicar novo Anúncio</Button>
        </Container>
        <Container maxWidth="md" sx={{ marginTop:"100px"}}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  sx={{ paddingTop:"56%" }} 
                  image={'https://picsum.photos/200/300'}
                  title="Titulo da imagem"
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Produto X
                  </Typography>
                  <Typography>
                    R$ 60,00
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">Editar</Button>
                  <Button size="small" color="primary">Remover</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  sx={{ paddingTop:"56%" }} 
                  image={'https://picsum.photos/200/300'}
                  title="Titulo da imagem"
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Produto X
                  </Typography>
                  <Typography>
                    R$ 60,00
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">Editar</Button>
                  <Button size="small" color="primary">Remover</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  sx={{ paddingTop:"56%" }} 
                  image={'https://picsum.photos/200/300'}
                  title="Titulo da imagem"
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Produto X
                  </Typography>
                  <Typography>
                    R$ 60,00
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">Editar</Button>
                  <Button size="small" color="primary">Remover</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </TemplateDefault>
    </>
  )
}
