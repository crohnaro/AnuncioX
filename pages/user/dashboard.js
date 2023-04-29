import { Button, Container, Grid, Typography } from "@mui/material";

import TemplateDefault from "../../src/templates/Default";
import Card from "../../src/components/Card";
import ProductsModel from '../../src/models/products';

import { getSession } from "next-auth/react";
import dbConnect from "../../src/utils/dbConnect";

const Home = ({ products }) => {
  return (
    <>
      <TemplateDefault>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center">
            Meus Anúncios
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: "30px auto", display: "block" }}
          >
            Publicar novo Anúncio
          </Button>
        </Container>
        <Container maxWidth="md" sx={{ marginTop: "100px" }}>
          {
            products.length === 0 &&
              <Typography component='div' variant='body1' align='center' color='textPrimary' gutterBottom>
                Nenhum anúncio publicado
              </Typography>
          }
          <Grid container spacing={4}>
            {
              products.map(product => (
                <Grid key={product._id} item xs={12} sm={6} md={4}>
                  <Card 
                    image={`/uploads/${product.files[0].name}`} 
                    title={product.title} 
                    subtitle={product.price} 
                    actions={
                      <>
                        <Button size='small' color='primary'>Editar</Button>
                        <Button size='small' color='primary'>Remover</Button>
                      </>
                    }
                  />
                </Grid>
              ))
            }
          </Grid>
        </Container>
      </TemplateDefault>
    </>
  );
};

Home.requireAuth = true;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  await dbConnect();

  let token = "";
  session.accessToken
    ? (token = session.accessToken)
    : (token = session.user.email);

  const products = await ProductsModel.find({ "user.id": token });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Home;
