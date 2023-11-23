import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Styles
import { styled } from "@mui/material/styles";

// Custom Components and context
import Hero from "../components/Hero";
import GrillaEmpresas from "../components/GrillaEmpresas";
import HomeBusiness from "./HomeBusiness";
import { useAuth } from "../context/AuthenticationContextProvider";

// External Components
import { Button, Typography } from "@mui/material";

const Home = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const renderUserHome = () => {
    return (
      <>
        <Hero />
        <Typography
          variant="h4"
          color="primary"
          align="center"
          style={{ fontWeight: "bold" }}
        >
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

  if (!isAuthenticated) return renderUserHome();
  if (user?.isProvider) return <HomeBusiness />;

  return window.location.host === "marketplace.deliver.ar" ? (
    //return window.location.host == "localhost:3000" ? (
    renderUserHome()
  ) : (
    <HomeBusiness />
  );
};

export default Home;
