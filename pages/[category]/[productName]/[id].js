import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
  useTheme
} from "@mui/material";

import dbConnect from "../../../src/utils/dbConnect";
import ProductsModel from '../../../src/models/products'

import TemplateDefault from "../../../src/templates/Default";

import styles from "../../../src/styles/Product.module.css";

import Carousel from "react-material-ui-carousel";
import { formatCurrency } from "../../../src/utils/currency";

const Product = ({ product }) => {

  const theme = useTheme()
  return (
    <TemplateDefault>
      <Container maxWidth="lg">
        <Grid className={styles.productContainer} container spacing={3}>
          <Grid item md={8} xs={12}>
            <Box className={styles.box} sx={{ backgroundColor: theme.palette.background.paper}}>
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
                      image={file.url}
                      title={product.title}
                    ></CardMedia>
                    </Card>
                  ))
                }
              </Carousel>
            </Box>
            <Box className={styles.box} textAlign="left" sx={{ backgroundColor: theme.palette.background.paper}}>
              <Typography color="inherit" component="span" variant="caption">
                Publicado 16 de Junho de 2021
              </Typography>
              <Typography
                color="inherit"
                component="h4"
                variant="h4"
                className={styles.productName}
              >
                {product.title}
              </Typography>
              <Typography color="inherit" component="h4" variant="h4" className={styles.price}>
                {formatCurrency(product.price)}
              </Typography>
              <Chip label={product.category} />
            </Box>
            <Box className={styles.box} textAlign="left" sx={{ backgroundColor: theme.palette.background.paper}}>
              <Typography color="inherit" component="h6" variant="h6">
                Descrição
              </Typography>
              <Typography color="inherit" component="p" variant="body2">
              { product.description }
              </Typography>
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
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
              <CardContent>
                <Typography color="inherit" component="p" variant="body2">{product.user.phone}</Typography>
              </CardContent>
            </Card>
            <Box textAlign="left" className={styles.box} sx={{ backgroundColor: theme.palette.background.paper}}>
              <Typography color="inherit" component="h6" variant="h6">
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
