import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Apis
import { obtenerProductosPorEmpresa } from "../apis/productApis";

// Styling and icons
import styled from "@emotion/styled";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// Components
import { useTheme } from "@emotion/react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import {
  Box,
  Button,
  Grid,
  MobileStepper,
  Paper,
  Typography,
} from "@mui/material";

const StyledContainer = styled(`div`)({
  display: "flex",
  flexWrap: true,
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ProductDetails = (props) => {
  const theme = useTheme();
  const companyID = window.location.pathname.split("/")[1];
  const productID = window.location.pathname.split("/")[3];
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({}); 
  const navigate = useNavigate();


  // Lifecycle
  useEffect(() => {
    const fetchData = async () => {
      await obtenerProductosPorEmpresa(companyID)
        .then((data) => {
          if (data) {
            let product = data.find((item) => item.uId === productID);
            console.log(product)
            product = {
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
            };
            setProductData(product);
          }
          return;
        })
        .catch((error) => console.error(error));
    };

    if (!loading) {
      setLoading(true);
      fetchData();
      setLoading(false);
    }
  }, []);

  // Extra functionallity

  // Handlers
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  // Renders
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
            <Button variant="contained" mb={2}>
              Comprar
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
                        maxWidth: "100%", // Controla el ancho máximo
                        maxHeight: "400px", // Controla la altura máxima
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
        </Grid>
      </Paper>
    );
  };

  return <StyledContainer>{renderImageCarrousel()}</StyledContainer>;
};

export default ProductDetails;
