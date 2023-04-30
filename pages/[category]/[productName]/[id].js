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

import dbConnect from "../../../src/utils/dbConnect";
import ProductsModel from '../../../src/models/products'

import TemplateDefault from "../../../src/templates/Default";

import styles from "../../../src/styles/Product.module.css";

import Carousel from "react-material-ui-carousel";
import { formatCurrency } from "../../../src/utils/currency";

const Product = ({ product }) => {
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
                {
                  product.files.map(file => (
                    <Card key={file.name} className={styles.card}>
                      <CardMedia
                      className={styles.cardMedia}
                      image={`/uploads/${file.name}`}
                      title={product.title}
                    ></CardMedia>
                    </Card>
                  ))
                }
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
                {product.title}
              </Typography>
              <Typography component="h4" variant="h4" className={styles.price}>
                {formatCurrency(product.price)}
              </Typography>
              <Chip label={product.category} />
            </Box>
            <Box className={styles.box} textAlign="left">
              <Typography component="h6" variant="h6">
                Descrição
              </Typography>
              <Typography component="p" variant="body2">
              { product.description }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Card elevation={0} className={styles.box}>
              <CardHeader
                avatar={
                  <Avatar src={product.user.image}>
                    {product.user.name || product.user.name[0]}
                  </Avatar>
                }
                title={product.user.name}
                subheader={product.user.email}
              />
              <CardMedia
                image={product.user.image}
                title={product.user.name}
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

export async function getServerSideProps({ query }) {
  const { id } = query

  await dbConnect()

  const product = await ProductsModel.findOne({ _id: id })

  return {
    props: {
      product: JSON.parse(JSON.stringify(product))
    }    
  }
}

export default Product;
