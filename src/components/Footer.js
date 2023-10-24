import React from "react";
import { AppBar, Toolbar, Container, Grid, IconButton, Typography, styled } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from "../media/logo.svg";
import { Link } from "react-router-dom"; // Importa Link desde React Router
import { useLocation } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  paddingTop: theme.spacing(4),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const StyledLogo = styled("img")(({ theme }) => ({
  width: "100px",
  height: "auto",
}));

const StyledCopyright = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(5),
}));

const StyledSmallText = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  textAlign: "center",
  fontFamily: 'Montserrat, sans-serif',
  marginTop: theme.spacing(1),
}));

export default function Footer() {

  const location = useLocation();

  return (
    <StyledAppBar position="static">
      <StyledContainer>
        <Toolbar>
          <Grid container spacing={2} columns={12} align="center">
            <Grid item xs={4}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                <StyledLogo src={logo} alt="Logo" />
                <StyledSmallText variant="body2">Lago Escobar</StyledSmallText>
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: location.pathname === "/" ? "#0B3660" : "inherit", // Cambia el color si la ubicación actual es "/"
                    cursor: "pointer"
                  }}
                >
                  Inicio
                </Link>
              </Typography>
              <Typography variant="body2">
                <Link
                  to="/empresas"
                  style={{
                    textDecoration: "none",
                    color: location.pathname === "/empresas" ? "#0B3660" : "inherit", // Cambia el color si la ubicación actual es "/marcas"
                    cursor: "pointer"
                  }}
                >
                  Marcas
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <StyledIconButton>
                <FacebookIcon />
              </StyledIconButton>
              <StyledIconButton>
                <TwitterIcon />
              </StyledIconButton>
              <StyledIconButton>
                <InstagramIcon />
              </StyledIconButton>
            </Grid>
          </Grid>
        </Toolbar>

        {/* Derechos de autor */}
        <StyledCopyright variant="body2" align="center">
          © {new Date().getFullYear()} Deliver.ar - Todos los derechos reservados
        </StyledCopyright>
      </StyledContainer>
    </StyledAppBar>
  );
}
