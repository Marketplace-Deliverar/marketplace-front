import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Button,
  Grid,
  MobileStepper,
  Paper,
  Typography,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useNavigate } from "react-router-dom";
import { obtenerProductosPorEmpresa } from "../apis/productApis";
import { useCartContext } from "../context/CartContextProvider";

const StyledContainer = styled(`div`)({
  display: "flex",
  flexWrap: true,
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ProductDetails = () => {
  const theme = useTheme();
  const { addToCart } = useCartContext();
  const companyID = window.location.pathname.split("/")[1];
  const productID = window.location.pathname.split("/")[3];
  const [activeStep, setActiveStep] = React.useState(0);
  const [productData, setProductData] = useState({});
  const [seAgregoAlCarrito, setSeAgregoAlCarrito] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerProductosPorEmpresa(companyID);
        if (data) {
          const product = data.find((item) => item.uId === productID);
          if (product) {
            setProductData({
              uId: productID,
              title: product.titulo,
              description: product.description,
              brand: product.marca,
              category: product.rubro,
              subCategory: product.categoria,
              price: product.precio,
              images: [
                product.imagen,
                "https://img.freepik.com/vector-premium/boton-rojo-comprar-ahora-diseno-web-haga-clic-aqui-boton-comprar-ahora-concepto-compras_820464-146.jpg",
              ],
              validateStock: product.stock,
              stock: product.nro_stock,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [companyID, productID]);

  // Extra functionallity

  // Handlers
  const handleBuyButtonClick = () => {
    //TODO: Pending add to cart funct
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleComprarClick = () => {
    setSeAgregoAlCarrito(true);
    setSnackbarOpen(true);
    console.log("enviar datos", productData);

    const nuevoProducto = {
      id: productData.uId,
      title: productData.title,
      description: productData.description,
      brand: productData.brand,
      cantidad: 1,
      category: productData.category,
      subCategory: productData.subCategory,
      price: productData.price,
      images: productData.images,
      stock: productData.stock,

    };
    addToCart(nuevoProducto);
    //console.log("carrito boton:", carrito)
    //navigate('/carrito', { state: { carrito: [...carrito, nuevoProducto] } });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway" || !snackbarOpen) {
      return;
    }
    setSnackbarOpen(false);
  };

  const renderImageCarrousel = () => {
    return (
      <Paper
        sx={{
          mt: "2rem",
          maxWidth: "80vw",
          padding: "1rem",
        }}
      >
        <Grid container>
          <Grid
            container
            item
            xs={6}
            textAlign={"left"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Typography variant="h5" align="start">
              {productData.brand} {" - "} {productData.title}
            </Typography>
            <Typography variant="caption" mb={4}>
              {productData.category}
              {" - "}
              {productData.subCategory}
            </Typography>
            <Typography
              variant="body1"
              align="start"
              textAlign={"justify"}
              pr={2}
              flexGrow={6}
            >
              {productData.description}
            </Typography>
            <Typography variant="h6" align="end" pr={2}>
              ${productData.price}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              mb={2}
              onClick={handleComprarClick}
            >
              {/* <Button variant="contained" mb={2} onClick={handleComprarClick}> */}
              Agregar al Carrito
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            display={"flex"}
            flexDirection={"column"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <AutoPlaySwipeableViews
              index={activeStep}
              onChangeIndex={handleStepChange}
            >
              {productData.images?.map((step, index) => (
                <div key={index}>
                  {activeStep - index <= 2 ? (
                    <Box
                      component="img"
                      src={step}
                      alt={productData.title}
                      sx={{
                        overflow: "hidden",
                        maxWidth: "100%",
                        maxHeight: "400px",
                      }}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={productData.images?.length}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === productData.images?.length - 1}
                  color="primary"
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  color="primary"
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Grid>
        </Grid >
      </Paper >
    );
  };

  const Popup = () => {
    return (
      <div>
        {seAgregoAlCarrito && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
            message="Producto agregado al carrito"
            action={
              <IconButton
                size="small"
                color="inherit"
                onClick={handleSnackbarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        )}
      </div>
    );
  };

  return (
    <StyledContainer>
      {productData && Object.keys(productData).length > 0 && (
        <>
          {renderImageCarrousel()}
          <Popup />
        </>
      )}
    </StyledContainer>
  )
};

export default ProductDetails;
