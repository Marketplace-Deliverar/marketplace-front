import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Styles
import { styled } from "@mui/material/styles";

// Custom Components
import Hero from "../components/Hero";
import GrillaEmpresas from "../components/GrillaEmpresas";
import HomeBusiness from "./HomeBusiness";

// External Components
import { Button, Typography } from "@mui/material";

const Home = (props) => {
  const navigate = useNavigate();
  const domain = window.location.hostname;
  // TODO: Validar empresa o usuario con provider de autenticacion
  const isCompany = domain.startsWith("marketplace.deliver.ar");

  const renderUserHome = () => {
    return (
      <>
        <Hero />
        <Typography variant="h3" color="primary" align="center">
          Marcas
        </Typography>
        <GrillaEmpresas />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/catalogoEmpresas")}
          sx={{ alignSelf: "center" }}
        >
          Ver todas
        </Button>
      </>
    );
  };

  // TODO: If not auth, redirect to login
  return !isCompany ? <HomeBusiness /> : renderUserHome();
};

export default Home;
