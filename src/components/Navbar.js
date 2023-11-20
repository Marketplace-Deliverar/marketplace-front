import React, { useEffect, useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  InputBase,
  IconButton,
  styled,
  Typography, Badge
} from "@mui/material";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import logo from "../media/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartContext } from "../context/CartContextProvider";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  paddingTop: theme.spacing(0),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const StyledSearch = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  maxWidth: "170px", // Ancho máximo (mínimo en dispositivos móviles)
  [theme.breakpoints.up("sm")]: {
    "&:focus": {
      width: "100%",
    },
  },
}));

const StyledSearchIcon = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  pointerEvents: "none",
  color: "#1976d2",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  padding: theme.spacing(0.5, 0.5, 0.5, 0.5), // Reducir el espacio al ajustar el padding
  paddingLeft: `calc(1em + ${theme.spacing(0)})`, // Ajustar el espacio izquierdo
  transition: theme.transitions.create("width"),
  width: "100%",
}));

const Navbar = ({ userIsAuthenticated = false, navBarColor, carrito }) => {

  const navigate = useNavigate();
  const { cart } = useCartContext();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOptions, setMenuOptions] = useState([]);
  let userData = localStorage.getItem('user') !== null ? localStorage.getItem('user') : undefined;
  if (userData) { userData = JSON.parse(userData) }

  useEffect(() => {

    if (userData) {
      switch (userData.type) {
        case "empresa":
          setMenuOptions([
            {
              label: "Mis datos",
              onClick: () => navigate("/"),
            },
            {
              label: "Mis productos",
              onClick: () => navigate("/"),
            },
            {
              label: "Pedidos",
              onClick: () => navigate("/"),
            },
            {
              label: "Cerrar sesión",
              onClick: () => {
                localStorage.clear(); setIsAuthenticated(false); window.location.reload();
              },
            },
          ]);
          break;

        case "individuo":
          setMenuOptions([
            {
              label: "Mi perfil",
              onClick: () => navigate("/usuarios/user_2XLq6Lb94pRk43JtdRmRI0e0PkU"), //dni
            },
            {
              label: "Mis pedidos",
              onClick: () => navigate("/pedidos/usuario/8337531602"), //dni
            },
            {
              label: "Cerrar sesión",
              onClick: () => {
                localStorage.clear(); setIsAuthenticated(false); window.location.reload();
              },
            },
          ]);
          break;

        default:
          setMenuOptions([
            {
              label: "Iniciar sesion / registrarse",
              onClick: () => navigate("/login"),
            },
          ]);
          break;
      }
    } else {
      setMenuOptions([
        {
          label: "Iniciar sesion / registrarse",
          onClick: () => navigate("/login"),
        },
      ]);
    }
  }, [isAuthenticated]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar className="navbar" position="static" sx={{ mb: 0 }} style={{ backgroundColor: navBarColor }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img src={logo} alt="Logo" style={{ height: 20 }} />
          </Link>
          <div style={{ flexGrow: 1 }}></div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ¡Bienvenida {userData?.name}!
          </Typography>
          {isAuthenticated && ( // Mostrar el carrito solo cuando el usuario ha iniciado sesión
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
