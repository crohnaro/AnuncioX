import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { signOut, useSession } from "next-auth/react";

import styles from "../styles/Header.module.css";

import {
  Avatar,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import Image from "next/image";
import logo from '../../public/logo-black.png'

export default function ButtonAppBar() {
  const [anchorUserMenu, setAnchorUserMenu] = useState(false);
  const { data : session, status } = useSession()

  const openUserMenu = Boolean(anchorUserMenu);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={3}>
        <Container maxWidth="lg">
          <Toolbar>
            
              <Typography sx={{ flexGrow: 1 }} variant="h6" component="div" >
                <Link style={{textDecoration: 'none', color: 'white',display: 'flex', alignItems: 'center', padding: '10px'}} href={'/'} >
                  <Image alt="anunX Logo" width={64} priority src={logo}/>
                </Link>  
              </Typography>
            
            
            <Link style={{ textDecoration: 'none' }} href={session ? '/user/publish' : '/auth/signin'} passHref>
              <Button color="secondary" variant="outlined">
                Anunciar e Vender
              </Button>
            </Link>
            {
              session
                ? (
                  <IconButton
                    color="secondary"
                    onClick={(e) => setAnchorUserMenu(e.currentTarget)}
                  >
                    {
                      session.user.image 
                      ? <Avatar className={styles.avatar} src={session.user.image} /> 
                      : <AccountCircle />
                    }
                    <Typography
                      className={styles.userName}
                      variant="subtitle2"
                      color="secondary"
                    >
                      {session.user.name}
                    </Typography>
                  </IconButton>
                )
                : null
            }


            <Menu
              anchorEl={anchorUserMenu}
              open={openUserMenu}
              onClose={() => setAnchorUserMenu(null)}
            >
              <MenuItem>
                <Link style={{
                  textDecoration: 'none',
                  color: '#000',
                }} href="/user/dashboard" passHref>
                  Menus anúncios
                </Link>
              </MenuItem>
              <MenuItem>
                <Link style={{
                  textDecoration: 'none',
                  color: '#000',
                }} href="/user/publish" passHref>
                  Publicar novo anúncio
                </Link>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => signOut({
                callbackUrl: '/'
              })}>Sair</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
