import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styles, icons & context
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useAuth } from "../context/AuthenticationContextProvider";

// External Components
import { Box, Button, Grid, Typography } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  padding: 2,
  margin: 2,
  borderRadius: 4,
}));

const CompanyData = () => {
  const theme = useTheme();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, []);

  // Renders
  const renderTabsMenu = () => {
    return (
      <Grid item xs={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            backgroundColor: theme.palette.primary.main,
            borderRadius: 2,
            p: 2,
            m: 4,
          }}
        >
          <Button variant="text">
            <Typography variant="subtitle2" color={"primary.contrastText"}>
              Mis Datos
            </Typography>
          </Button>
          <Button
            variant="text"
            onClick={() => {
              navigate("/businessProducts");
            }}
          >
            <Typography variant="subtitle2" color={"primary.contrastText"}>
              Mis Productos
            </Typography>
          </Button>
        </Box>
      </Grid>
    );
  };

  const renderCompanyData = () => {
    return (
      <Grid item xs={8} sx={{ marginY: 4 }}>
        <Typography component="h1" variant="h5" mb={2} ml={2}>
          Datos de Empresa
        </Typography>
        {user && (
          <StyledBox>
            <Typography component="h1" variant="h6" mb={2} ml={2}>
              CUIT
            </Typography>
            <Typography variant="subtitle1" mb={2} ml={2}>
              {user.cuit}
            </Typography>
            <Typography component="h1" variant="h6" mb={2} ml={2}>
              Razon Social
            </Typography>
            <Typography variant="subtitle1" mb={2} ml={2}>
              {user.businessName}
            </Typography>
            <Typography component="h1" variant="h6" mb={2} ml={2}>
              Rubro
            </Typography>
            <Typography variant="subtitle1" mb={2} ml={2}>
              {user.category}
            </Typography>
            <Typography component="h1" variant="h6" mb={2} ml={2}>
              Email
            </Typography>
            <Typography variant="subtitle1" mb={2} ml={2}>
              {user.email}
            </Typography>
            <Typography component="h1" variant="h6" mb={2} ml={2}>
              Direccion
            </Typography>
            <Typography variant="subtitle1" mb={2} ml={2}>
              {user.address}
            </Typography>
            <Typography component="h1" variant="h6" mb={2} ml={2}>
              Teléfono Celular
            </Typography>
            <Typography variant="subtitle1" mb={2} ml={2}>
              {user.phone}
            </Typography>
            <Typography component="h1" variant="h6" mb={2} ml={2}>
              Color Primario
            </Typography>
            <Typography variant="subtitle1" mb={2} ml={2}>
              {user.primaryColor}
            </Typography>
            <Typography component="h1" variant="h6" mb={2} ml={2}>
              Color Primario
            </Typography>
            <Typography variant="subtitle1" mb={2} ml={2}>
              {user.secondaryColor}
            </Typography>
          </StyledBox>
        )}
      </Grid>
    );
  };

  return (
    <>
      <Grid container spacing={2}>
        {renderTabsMenu()}
        {renderCompanyData()}
      </Grid>
    </>
  );
};

export default CompanyData;
