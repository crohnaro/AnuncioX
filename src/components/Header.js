import * as React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { AccountCircle, Brightness4, Brightness7 } from "@mui/icons-material";

import { signOut, useSession } from "next-auth/react";
import { useState, useContext } from "react";

import {
  Avatar,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Button,
  Typography,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";

import Link from "next/link";
import Image from "next/image";

import logo from "../../public/logo-black.png";

import styles from "../styles/Header.module.css";
import { ColorModeContext } from "../../src/contexts/ColorModeContext";
import { lightBlue } from "@mui/material/colors";

export default function ButtonAppBar() {
  const [anchorUserMenu, setAnchorUserMenu] = useState(false);
  const { data: session, status } = useSession();

  const openUserMenu = Boolean(anchorUserMenu);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={3}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }} variant="h6" component="div">
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                }}
                href={"/"}
              >
                <Image alt="anunX Logo" width={64} priority src={logo} />
              </Link>
            </Typography>

            <Button
              href={session ? "/user/publish" : "/auth/signin"}
              color="secondary"
              variant="contained"
              endIcon={<AddShoppingCartIcon />}
            >
              Anunciar e Vender
            </Button>

            <Box>
              <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7 />
                ) : (
                  <Brightness4 />
                )}
              </IconButton>
            </Box>

            {session ? (
              <IconButton
                color="secondary"
                onClick={(e) => setAnchorUserMenu(e.currentTarget)}
                sx={{ marginLeft: "18px" }}
              >
                {session.user.image ? (
                  <Avatar className={styles.avatar} src={session.user.image} />
                ) : (
                  <Avatar>{session.user.name[0].toUpperCase()}</Avatar>
                )}
              </IconButton>
            ) : null}

            <Menu
              anchorEl={anchorUserMenu}
              open={openUserMenu}
              onClose={() => setAnchorUserMenu(null)}
            >
              <MenuItem>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  href="/user/dashboard"
                  passHref
                >
                  Menus anúncios
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  href="/user/publish"
                  passHref
                >
                  Publicar novo anúncio
                </Link>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                Sair
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
