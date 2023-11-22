import React from "react";

// Styles, images & icons
import background from "../media/background.jpg";
import styled from "@emotion/styled";

// External component library
import { Typography, Paper } from "@mui/material";

const StyledContainer = styled(`div`)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  padding: "5rem",

  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});

const StyledImage = styled(`img`)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const StyledOverlay = styled(`div`)({
  zIndex: 0,
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  textAlign: "left",
  width: "100%",

  background: "transparent",
  zIndex: 1,
  color: theme.palette.primary.contrastText, // Establecer el color de texto en blanco
}));

const Hero = () => {
  const descriptionText =
    "Bienvenidos a Deliver.ar, la innovadora solución de entrega a domicilio que está revolucionando la forma en que recibes tus pedidos en Lago Escobar. ¿Te imaginas recibir tus alimentos favoritos, productos de tiendas locales y más, entregados por adorables robots repartidores? ¡En Deliver.ar, lo hacemos posible!";

  return (
    <StyledContainer>
      <StyledImage src={background} alt="Background" />
      <StyledOverlay />
      <StyledPaper>
        <Typography variant="subtitle2" color="secondary">
          INDUSTRIAS ARGENTINAS
        </Typography>
        <Typography variant="h3">Deliver.ar</Typography>

        <Typography variant="body1" mt={2} maxWidth={"50rem"}>
          {descriptionText}
        </Typography>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Hero;
