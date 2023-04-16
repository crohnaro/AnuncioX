import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import {
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import TemplateDefault from "../src/templates/Default";

import Card from "../src/components/Card"

import styles from "../src/styles/Index.module.css";

const Home = () => {
  const theme = useTheme();
  return (
    <TemplateDefault>
      <Container maxWidth="md">
        <Typography component="h1" variant="h3" align="center" color="primary">
          O que deseja encontrar?
        </Typography>
        <Paper className={styles.searchBox}>
          <InputBase placeholder="Ex.: Iphone 12 com garantia" fullWidth />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>

      <Container maxWidth="md" className={styles.cardGrid}>
        <Typography component="h2" variant="h4" align="center" color="primary">
          Destaques
        </Typography>
        <br />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              image={"https://picsum.photos/200/300"}
              title={"Produto X"}
              subtitle={"R$ 60,00"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              image={"https://picsum.photos/200/300"}
              title={"Produto X"}
              subtitle={"R$ 60,00"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              image={"https://picsum.photos/200/300"}
              title={"Produto X"}
              subtitle={"R$ 60,00"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              image={"https://picsum.photos/200/300"}
              title={"Produto X"}
              subtitle={"R$ 60,00"}
            />
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  );
};

export default Home;
