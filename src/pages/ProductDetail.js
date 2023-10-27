import React, { useState } from "react";

// Styling and icons
import styled from "@emotion/styled";
import { Image } from "@mui/icons-material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// Components
import { useNavigate } from "react-router-dom";
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

const mockedProduct = {
  title: "Labial",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu congue nisi, ut pretium odio. Integer vestibulum condimentum metus. Maecenas tempus commodo condimentum. Vivamus ut augue sit amet sem vehicula fringilla. In pretium dui tortor, sed consequat mi dignissim ut. Cras molestie tempus lacus blandit lobortis. Phasellus nisi purus, viverra in vulputate interdum, posuere eu erat.

In laoreet pharetra mauris, id tristique justo mollis eu. Duis non malesuada tortor, nec convallis tellus. Sed tristique viverra tincidunt. In sit amet tellus eu diam iaculis condimentum sit amet ut urna. Curabitur dignissim vulputate tristique. Duis gravida id sem vel viverra. Pellentesque bibendum pellentesque tellus id interdum. Quisque sit amet justo quis nisl lobortis pellentesque id nec quam. Sed sapien lorem, iaculis in consequat nec, bibendum a dui. In at erat scelerisque, aliquam dolor nec, posuere orci. Duis sem quam, convallis nec arcu a, maximus sagittis urna.`,
  brand: "Clinique",
  category: "Salud y belleza",
  subCategory: "Maquillaje",
  price: 800,
  images: [
    "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=formatt&fit=crop&w=400&h=400&q=60",
    "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=400&h=400&q=60",
  ],
  validateStock: true,
  stock: 10,
};

const ProductDetails = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(mockedProduct);

  // Lifecycle

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
            jus
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
              {productData.images.map((step, index) => (
                <div key={index}>
                  {activeStep - index <= 2 ? (
                    <Box
                      component="img"
                      src={step}
                      alt={productData.title}
                      sx={{
                        display: "block",
                        maxWidth: 400,
                        overflow: "hidden",
                        width: "100%",
                      }}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={productData.images.length}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === productData.images.length - 1}
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
