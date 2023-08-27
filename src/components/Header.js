import * as React from "react";

import { Brightness4, Brightness7 } from "@mui/icons-material";
import MoreIcon from "@mui/icons-material/MoreVert";

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
import AnnounceButton from "./Annouce";

export default function ButtonAppBar() {
  const [anchorUserMenu, setAnchorUserMenu] = useState(false);
  const [anchorUserMenuWithoutSession, setAnchorUserMenuWithoutSession] =
    useState(false);
  const { data: session, status } = useSession();

  const openUserMenu = Boolean(anchorUserMenu);
  const openUserMenuWithoutSession = Boolean(anchorUserMenuWithoutSession);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : theme.palette.primary.light,
        }}
        position="static"
        elevation={3}
      >
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

            <div className={styles.moreIconContainer}>
              <IconButton
                onClick={(e) =>
                  setAnchorUserMenuWithoutSession(e.currentTarget)
                }
              >
                <MoreIcon sx={{ color: "#fff" }} />
              </IconButton>
            </div>

            <Menu
              anchorEl={anchorUserMenuWithoutSession}
              open={openUserMenuWithoutSession}
              onClose={() => setAnchorUserMenuWithoutSession(null)}
            >
              <MenuItem>
                <AnnounceButton />
              </MenuItem>
              <MenuItem sx={{ alignItems: "center", justifyContent: "center" }}>
                <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === "dark" ? (
                    <Brightness7 />
                  ) : (
                    <Brightness4 />
                  )}
                </IconButton>
              </MenuItem>
            </Menu>

            {session ? (
              <div>
                <IconButton
                  onClick={(e) => setAnchorUserMenu(e.currentTarget)}
                  sx={{ marginLeft: "18px" }}
                >
                  {session.user.image ? (
                    <Avatar
                      className={styles.avatar}
                      src={session.user.image}
                    />
                  ) : (
                    <Avatar>{session.user.name[0].toUpperCase()}</Avatar>
                  )}
                  <MoreIcon />
                </IconButton>

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
                  <MenuItem>
                    <AnnounceButton />
                  </MenuItem>
                  <MenuItem
                    sx={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <IconButton
                      onClick={colorMode.toggleColorMode}
                      color="inherit"
                    >
                      {theme.palette.mode === "dark" ? (
                        <Brightness7 />
                      ) : (
                        <Brightness4 />
                      )}
                    </IconButton>
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
              </div>
            ) : (
              <div className={styles.announceBtnColorToogle}>
                <AnnounceButton />
                <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === "dark" ? (
                    <Brightness7 />
                  ) : (
                    <Brightness4 />
                  )}
                </IconButton>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
