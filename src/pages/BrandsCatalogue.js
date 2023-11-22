import React from "react";
import GrillaEmpresas from "../components/GrillaEmpresas";

// Styles
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const StyledContainer = styled(`div`)({
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  marginTop: "2rem",
});

const BrandsCatalogue = (props) => {
  return (
    <StyledContainer>
      <Typography variant="h4" color="primary" align="center" style={{ fontWeight: 'bold' }}>
        Marcas
      </Typography>
      <GrillaEmpresas />
    </StyledContainer>
  );
};

export default BrandsCatalogue;
