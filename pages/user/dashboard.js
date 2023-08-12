import { useState } from "react";
import { getSession } from "next-auth/react";
import { formatCurrency } from '../../src/utils/currency'
import dbConnect from "../../src/utils/dbConnect";
import ProductsModel from '../../src/models/products';
import useToasty from "../../src/contexts/Toasty";

import Link from 'next/link'

import { 
  Button, 
  Container, 
  Grid, 
  Typography, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from "@mui/material";

import TemplateDefault from "../../src/templates/Default";
import Card from "../../src/components/Card";
import axios from "axios";

const Home = ({ products }) => {
  const [productId, setProductId] = useState()
  const [removedProducts, setRemovedProducts] = useState([])
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const { setToasty } = useToasty()

  const handleCloseModal = () => setOpenConfirmModal(false)
  
  const handleClickRemove = (productId) =>{
    setProductId(productId)
    setOpenConfirmModal(true)
  }

  const handleConfirmRemove = () => {
    axios.delete('/api/products/delete', {
      data: {
        id : productId
      }
    }).then(handleSuccess)
      .catch(handleError)
  }

  const handleSuccess = () => {
    console.log('deletou')
    setOpenConfirmModal(false)
    setRemovedProducts([...removedProducts, productId])
    setToasty({
      open: true,
      severity: 'success',
      text: "Anuncio removido com sucesso!"
    })
  }

  const handleError = () => {
    console.log('nao deletou')
    setOpenConfirmModal(false)
    setToasty({
      open: true,
      severity: 'error',
      text: "Ocorreu um erro!"
    })
  }



  return (
    <>
      <TemplateDefault>
        <Dialog
          open={openConfirmModal}
          onClose={handleCloseModal}
        >
          <DialogTitle>
            Deseja realmente remover este anúncio?
          </DialogTitle>
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
          <Link style={{ textDecoration: 'none' }} href={'/user/publish'} passHref>
            <Button
              variant="contained"
              color="primary"
              sx={{ margin: "30px auto", display: "block" }}
            >
              Publicar novo Anúncio
            </Button>
          </Link>
          
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
              products.map(product => {
                if(removedProducts.includes(product._id)) return null
                return (
                  
                  
                  
                  <Grid key={product._id} item xs={12} sm={6} md={4}>
                    <Link style={{textDecoration: 'none'}} href={`/${product.category}/${product.title}/${product._id}`}>
                      <Card 
                          image={product.files[0].url} 
                          title={product.title} 
                          subtitle={ formatCurrency( product.price ) } 
                          actions={
                            <>
                              <Button size='small' color='primary'>Editar</Button>
                              <Button size='small' color='primary' onClick={() =>handleClickRemove(product._id)}>Remover</Button>
                            </>
                          }
                        />
                    </Link>
                  </Grid>
                )
              })
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
    : (token = session.user.id);

  const products = await ProductsModel.find({ "user.id": token });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Home;
