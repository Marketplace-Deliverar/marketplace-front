import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Styles & icons
import AccountCircle from "@mui/icons-material/AccountCircle";
import logo from "../media/logo.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Custom components & context
import { useCartContext } from "../context/CartContextProvider";
import { useAuth } from "../context/AuthenticationContextProvider";

// External component library
import {
  AppBar,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  IconButton,
  styled,
  Typography,
  Badge,
} from "@mui/material";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  paddingTop: theme.spacing(0),
}));

const Navbar = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCartContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOptions, setMenuOptions] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setMenuOptions([
        {
          label: "Iniciar sesion / registrarse",
          onClick: () => {
            window.location.href = "/"; // TODO: Agregar ruta al login del modulo de usuarios
          },
        },
      ]);
    } else {
      if (user.isProvider) {
        setMenuOptions([
          {
            label: "Mis datos",
            onClick: () => navigate("/empresa"),
          },
          {
            label: "Mis productos",
            onClick: () => navigate("/businessProducts"),
          },
          {
            label: "Cerrar sesión",
            onClick: () => {
              localStorage.clear();
              logout();
              window.location.reload();
            },
          },
        ]);
      } else {
        //"Individuo"
        setMenuOptions([
          {
            label: "Mi perfil",
            onClick: () => navigate("/perfil"),
          },
          {
            label: "Mis pedidos",
            onClick: () => navigate("/pedidos"),
          },
          {
            label: "Cerrar sesión",
            onClick: () => {
              localStorage.clear();
              logout();
              window.location.reload();
            },
          },
        ]);
      }
    }
  }, [isAuthenticated]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar className="navbar" position="static" sx={{ mb: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img src={logo} alt="Logo" style={{ height: 20 }} />
          </Link>
          <div style={{ flexGrow: 1 }}></div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ¡Bienvenida {user?.name}!
          </Typography>
          {isAuthenticated &&
            !user.isProvider && ( // Mostrar el carrito solo cuando el usuario ha iniciado sesión, no si es empresa
              <IconButton
                size="large"
                aria-label="Carrito de compras"
                color="inherit"
                onClick={() => navigate("/carrito")}
              >
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
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
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {menuOptions.map((option, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  handleClose();
                  option.onClick();
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
