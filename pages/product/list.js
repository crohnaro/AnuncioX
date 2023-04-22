import {
  Container,
  Grid,
  InputBase,
  IconButton,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import TemplateDefault from "../../src/templates/Default";

import SearchIcon from "@mui/icons-material/Search";

import styles from "../../src/styles/List.module.css";

import Card from "../../src/components/Card";

const List = () => {
  return (
    <TemplateDefault>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper component="form" className={styles.searchBox}>
              <InputBase placeholder="Ex.: Iphone 12 com garantia" fullWidth />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Box className={styles.box}>
            <Typography component="h6" variant="h6">
              Anúncios
            </Typography>
            <Typography component="span" variant="subtitle2">
              ECONTRADOS 200 ANÚNCIOS
            </Typography>
            <br />
            <br />

            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  image="https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/p/o/pouter-3-rgb-water-cooler-01_8.jpg"
                  title="Produto 1"
                  subtitle="R$ 500,00"
                ></Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  image="https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/p/o/pouter-3-rgb-water-cooler-01_8.jpg"
                  title="Produto 1"
                  subtitle="R$ 500,00"
                ></Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  image="https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/p/o/pouter-3-rgb-water-cooler-01_8.jpg"
                  title="Produto 1"
                  subtitle="R$ 500,00"
                ></Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </TemplateDefault>
  );
};

export default List;
