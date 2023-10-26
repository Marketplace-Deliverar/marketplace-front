import * as React from "react";

// Styles & context
import "../styles/index.css";
import ThemeContextProvider from "../context/ThemeContextProvider";
import { styled } from "@mui/material/styles";

// Custom components
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import Inicio from "./Inicio";
import Empresas from "./Empresas";
import Login from "./Login";

// Components
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const StyledWrapper = styled(`div`)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  top: 1, // Asegura que el contenedor se expanda verticalmente
}));

const App = () => {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <header>
        <title>Deliver.ar</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.svg" />
      </header>
      <BrowserRouter>
        <StyledWrapper>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/empresas" element={<Empresas />} />
          </Routes>
          <Footer />
        </StyledWrapper>
      </BrowserRouter>
    </ThemeContextProvider>
  );
};

export default App;
