import { Container, Grid, Box, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';

import styles from "../styles/Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <Container maxWidth="lg" component="footer" className={styles.footer}>
      <Divider variant="fullWidth" sx={{ marginBottom: "50px", color: "inherit"}}/>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Box textAlign="center">
            <Link style={{ textDecoration: "none", color: "inherit" }} href="#" passHref>
              <Typography variant="subtitle1">
                Ajuda e Contato
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box textAlign="center">
            <Link style={{ textDecoration: "none", color: "inherit"  }} href="#" passHref>
              <Typography variant="subtitle1">
                Dicas de segurança
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box textAlign="center">
            <Link style={{ textDecoration: "none", color: "inherit" }} href="#" passHref>
              <Typography variant="subtitle1">
                Anunciar e Vender
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box textAlign="center">
            <Link style={{ textDecoration: "none", color: "inherit" }} href="#" passHref>
              <Typography variant="subtitle1">
                Plano Profissional
              </Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
