import {
  Container,
  Grid,

  Typography,
} from "@mui/material";

import styles from "../src/styles/Index.module.css";
import TemplateDefault from "../src/templates/Default";

import Card from "../src/components/Card";

import Link from "next/link";
import slugify from "slugify";
import dbConnect from "../src/utils/dbConnect";
import ProductsModel from "../src/models/products";
import { formatCurrency } from "../src/utils/currency";
import SearchInput from '@/src/components/SearchInput';

const Home = ({ products }) => {
  
  return (
    <TemplateDefault>
      <Container maxWidth="md">
        <Typography component="h1" variant="h3" align="center" color="inherit" marginTop={20}>
          O que deseja encontrar?
        </Typography>
        <SearchInput />
      </Container>

      <Container maxWidth="lg" className={styles.cardGrid}>
        <Typography component="h1" variant="h4" align="center" color="inherit">
          Destaques
        </Typography>
        <br />
        <Grid container spacing={4}>
          {products.map((product) => {
            const category = slugify(product.category).toLocaleLowerCase()
            const title = slugify(product.title).toLocaleLowerCase()

            return (
              <Grid key={product._id} item xs={12} sm={6} md={4}>
                <Link style={{textDecoration: 'none'}} href={`/${category}/${title}/${product._id}`}>
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
      </Container>
    </TemplateDefault>
  );
};

export async function getServerSideProps() {
  await dbConnect();

  const products = await ProductsModel.aggregate([
    {
      $sample: { size: 6 },
    },
  ]);

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
export default Home;
