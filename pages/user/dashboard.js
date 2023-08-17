import { useState } from "react";
import { getSession } from "next-auth/react";
import { formatCurrency } from "../../src/utils/currency";
import dbConnect from "../../src/utils/dbConnect";
import ProductsModel from "../../src/models/products";
import useToasty from "../../src/contexts/Toasty";

import Link from "next/link";

import {
  Button,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import TemplateDefault from "../../src/templates/Default";
import Card from "../../src/components/Card";
import axios from "axios";

const Home = ({ products }) => {
  const [productId, setProductId] = useState();
  const [removedProducts, setRemovedProducts] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { setToasty } = useToasty();

  const handleCloseModal = () => setOpenConfirmModal(false);

  const handleClickRemove = (productId) => {
    console.log("Clicked remove for product ID:", productId);
    setProductId(productId);
    setOpenConfirmModal(true);
  };

  const handleConfirmRemove = async () => {
    console.log("Confirm remove function called");

    try {
      const response = await axios.delete(
        `/api/products/delete?id=${productId}`
      );
      if (response.data.success === true) {
        setOpenConfirmModal(false);
        setRemovedProducts([...removedProducts, productId]);
        setToasty({
          open: true,
          severity: "success",
          text: "Anuncio removido com sucesso!",
        });
      } else {
        setOpenConfirmModal(false);
        setToasty({
          open: true,
          severity: "error",
          text: "Ocorreu um erro!",
        });
      }
    } catch (error) {
      setOpenConfirmModal(false);
      setToasty({
        open: true,
        severity: "error",
        text: "Ocorreu um erro!",
      });
    }
  };

  const filteredProducts = products.filter(
    (product) => !removedProducts.includes(product._id)
  );

  return (
    <>
      <TemplateDefault>
        <Dialog open={openConfirmModal} onClose={handleCloseModal}>
          <DialogTitle>Deseja realmente remover este anúncio?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Ao confirmar essa operação, nao tem como reverter
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button onClick={handleConfirmRemove} autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center">
            Meus Anúncios
          </Typography>
          <Link
            style={{ textDecoration: "none" }}
            href={"/user/publish"}
            passHref
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ margin: "30px auto", display: "block" }}
            >
              Publicar novo Anúncio
            </Button>
          </Link>
        </Container>
        <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
          {filteredProducts.length === 0 && (
            <Typography
              component="div"
              variant="body1"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Nenhum anúncio publicado
            </Typography>
          )}
          <Grid container spacing={4}>
            {filteredProducts.map((product) => {
              if (removedProducts.includes(products._id)) return null;
              return (
                <Grid key={product._id} item xs={12} sm={6} md={4}>
                  <Card
                    image={product.files[0].url}
                    title={product.title}
                    subtitle={formatCurrency(product.price)}
                    actions={
                      <>
                        <Link
                          style={{ textDecoration: "none" }}
                          href={`/${product.category}/${product.title}/${product._id}`}
                        >
                          <Button size="small" color="primary">
                            Ver anuncio
                          </Button>
                        </Link>
                        <Link
                          style={{ textDecoration: "none" }}
                          href={`/user/update/${product._id}`}
                        >
                          <Button size="small" color="primary">
                            Editar
                          </Button>
                        </Link>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            console.log(product._id);
                            console.log(product);
                            handleClickRemove(product._id);
                          }}
                        >
                          Remover
                        </Button>
                      </>
                    }
                  />
                </Grid>
              );
            })}
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

  console.log(session);
  console.log(token);

  console.log(session.user.email);
  const products = await ProductsModel.find({
    "user.email": session.user.email,
  });

  console.log(products);
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Home;
