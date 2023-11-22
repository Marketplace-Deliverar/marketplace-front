import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles, images & icons
import { useThemeContext } from "../context/ThemeContextProvider";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import fravega from "./../media/fravega-1.png";
import garbarino from "./../media/garbarino-1.png";
import carrefour from "./../media/carrefour-logo.png";
import marketplace from "./../media/mkt.jpg";

// Custom components & context
import ProductCards from "../components/ProductCards";
import { LeftSidebarFilter } from "../leftSidebarFilter";
import { useAuth } from "../context/AuthenticationContextProvider";

// External components
import { Box, Button, Modal, Stack, Typography } from "@mui/material";

export default function HomeBusiness(props) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { changeTheme } = useThemeContext();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const successParam = urlSearchParams.get("success");
    const isSuccess = successParam === "true";

    if (isSuccess) {
      setOpenModal(true);
    }

    changeTheme(user.primaryColor, user.secondaryColor);
  }, [user]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  //Render
  const renderBusinessImage = () => {
    const getImage = () => {
      // TODO: Deberiamos usar el link que viene en los datos?
      switch (user.businessName.toLowerCase()) {
        case "fravega":
          return fravega;
        case "carbarino":
          return garbarino;
        case "carrefour":
          return carrefour;
        default:
          return marketplace;
      }
    };

    if (!user) return;
    return (
      <div className="image-container">
        <img
          className="custom-image"
          style={{
            maxWidth: "80%",
            maxHeight: "400px",
            display: "block",
            margin: "0 auto",
          }}
          src={getImage()}
          alt="banner_empresa"
        />
      </div>
    );
  };

  const renderSuccessModal = () => {
    return (
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <CheckCircleOutlineIcon
            color="success"
            sx={{ fontSize: 50, mb: 2 }}
          />
          <Typography variant="h5" mb={2}>
            ¡Gracias por elegirnos!
          </Typography>
          <Typography variant="body1">
            La factura estará disponible pronto en la sección 'Mis Pedidos'.
          </Typography>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="success"
            sx={{ mt: 3 }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    );
  };

  return (
    <>
      {user && user.businessName && renderBusinessImage()}
      <Stack direction="row" sx={{ gap: 3 }}>
        <LeftSidebarFilter />
        <ProductCards />
      </Stack>
      {renderSuccessModal()}
    </>
  );
}
