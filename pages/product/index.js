import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import TemplateDefault from "../../src/templates/Default";

import styles from "../../src/styles/Product.module.css";

import Carousel from "react-material-ui-carousel";

const Product = () => {
  return (
    <TemplateDefault>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Box className={styles.box}>
              <Carousel
                autoPlay={false}
                animation="slide"
                navButtonsAlwaysVisible
              >
                <Card className={styles.card}>
                  <CardMedia
                    className={styles.cardMedia}
                    image="https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/p/o/pouter-3-rgb-water-cooler-01_8.jpg"
                    title="Titulo da imagem"
                  ></CardMedia>
                </Card>
                <Card className={styles.card}>
                  <CardMedia
                    className={styles.cardMedia}
                    image="https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/p/o/pouter-3-rgb-water-cooler-02_8.jpg"
                  ></CardMedia>
                </Card>
              </Carousel>
            </Box>
            <Box className={styles.box} textAlign="left">
              <Typography component="span" variant="caption">
                Publicado 16 de Junho de 2021
              </Typography>
              <Typography
                component="h4"
                variant="h4"
                className={styles.productName}
              >
                PC Master Race RTX 10090
              </Typography>
              <Typography component="h4" variant="h4" className={styles.price}>
                R$ 1.000.000.000
              </Typography>
              <Chip label="Categoria" />
            </Box>
            <Box className={styles.box} textAlign="left">
              <Typography component="h6" variant="h6">
                Descrição
              </Typography>
              <Typography component="p" variant="body2">
                Em resumo, o Computador de Última Geração Gamer é a escolha
                perfeita para os jogadores mais exigentes que buscam desempenho
                máximo, gráficos impressionantes e uma experiência de jogo
                imersiva. Com seu hardware de ponta, design moderno e recursos
                avançados, este computador é verdadeiramente uma obra-prima da
                tecnologia gamer. Prepare-se para mergulhar em um mundo de jogos
                com qualidade e desempenho incomparáveis!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Card elevation={0} className={styles.box}>
              <CardHeader
                avatar={<Avatar>V</Avatar>}
                title="Vinicios Cararine"
                subheader="vini@dev.com.br"
              />
              <CardMedia
                image="https://rocketz.com.br/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBWms9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75bbc3763ae3d50875cc3bc1045623e3085fa253/pc-gamer-atlas-top.jpg"
                title="Vinicios Cararine Coelho"
              />
            </Card>
            <Box textAlign="left" className={styles.box}>
              <Typography component="h6" variant="h6">
                Localização
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  );
};

export default Product;
