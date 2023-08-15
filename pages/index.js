import { useState } from 'react'
import { useRouter } from 'next/router';

import {
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";

import styles from "../src/styles/Index.module.css";
import TemplateDefault from "../src/templates/Default";

import Card from "../src/components/Card";
import SearchIcon from "@mui/icons-material/Search";

import Link from "next/link";
import slugify from "slugify";
import dbConnect from "../src/utils/dbConnect";
import ProductsModel from "../src/models/products";
import { formatCurrency } from "../src/utils/currency";

const Home = ({ products }) => {
  const router = useRouter()
  const [search, setSearch] = useState()
  const handleSubmitSearch = () => {
    router.push({
      pathname: `/search/${search}`,
    }) 
  }
  return (
    <TemplateDefault>
      <Container maxWidth="md">
        <Typography component="h1" variant="h3" align="center" color="primary">
          O que deseja encontrar?
        </Typography>
        <Paper className={styles.searchBox}>
          <InputBase 
          placeholder="Ex.: Iphone 12 com garantia" 
          fullWidth 
          onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton onClick={handleSubmitSearch}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>

      <Container maxWidth="lg" className={styles.cardGrid}>
        <Typography component="h2" variant="h4" align="center" color="primary">
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
      $sample: { size: 3 },
    },
  ]);

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
export default Home;
