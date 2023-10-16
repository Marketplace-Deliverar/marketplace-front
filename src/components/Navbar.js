import React, { useState } from "react";

// Styles, icons & context
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

// Components
import { AppBar, Container, Toolbar, Grid, StyledLogo } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import logo from "../media/logo.svg";

const StyledIcon = styled("img");

const Navbar = () => {
  const isTinyDisplay = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const pages = ['Nosotros', 'Inicio', 'Blog'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Renders
  const renderSmallDisplay = () => {
    return <></>;
  };

  const renderMediumDisplay = () => {
    return <></>;
  };

  // Handlers
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className="navbar" position="static" sx={{ mb: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>  {/* ¿Cómo poner el logo? ¿Cómo poner las opciones de menu y el icono a la derecha? */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Inciar Sesión</MenuItem>
                <MenuItem onClick={handleClose}>Registrarme</MenuItem>
              </Menu>
            </div>
          )}

          {isTinyDisplay ? renderSmallDisplay() : renderMediumDisplay()}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
