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
import Link from 'next/link'
import slugify from "slugify";
import { formatCurrency } from "../../src/utils/currency";
import ProductsModel from '../../src/models/products'

import SearchIcon from "@mui/icons-material/Search";

import styles from "../../src/styles/List.module.css";

import Card from "../../src/components/Card";

const List = ({ products }) => {
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
              ECONTRADOS {products.length} ANÚNCIOS
            </Typography>
            <br />
            <br />

            <Grid container spacing={4}>
              {products.map((product) => {
                const category = slugify(product.category).toLocaleLowerCase();
                const title = slugify(product.title).toLocaleLowerCase();

                return (
                  <Grid key={product._id} item xs={12} sm={6} md={4}>
                    <Link
                      style={{ textDecoration: "none" }}
                      href={`/${category}/${title}/${product._id}`}
                    >
                      <Card
                        image={product.files[0].url}
                        title={product.title}
                        subtitle={formatCurrency(product.price)}
                      />
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>
      </Container>
    </TemplateDefault>
  );
};

export async function getServerSideProps({ query }) {
  const { q } = query;

  const products = await ProductsModel.find({
    $or: [
      {
        title: {
          $regex: q,
          $options: "i",
        },
      },
      {
        description: {
          $regex: q,
          $options: "i",
        },
      },
    ],
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default List;
