import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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

export default function ButtonAppBar() {
  const [anchorUserMenu, setAnchorUserMenu] = useState(false);

  const openUserMenu = Boolean(anchorUserMenu);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={3}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Anunx
            </Typography>
            <Link href="/user/publish" passHref>
              <Button color="secondary" variant="outlined">
                Anunciar e Vender
              </Button>
            </Link>
            <IconButton
              color="secondary"
              onClick={(e) => setAnchorUserMenu(e.currentTarget)}
            >
              {true === false ? <Avatar src="" /> : <AccountCircle />}
              <Typography
                className={styles.userName}
                variant="subtitle2"
                color="secondary"
              >
                Vinicios Cararine
              </Typography>
            </IconButton>

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
              <MenuItem>Sair</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
