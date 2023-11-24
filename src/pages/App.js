import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Styles & context
import "../styles/index.css";
import ThemeContextProvider from "../context/ThemeContextProvider";
import CartContextProvider from "../context/CartContextProvider";
import { styled } from "@mui/material/styles";

// Custom components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Home from "./Home";
import ProductDetail from "./ProductDetail";
import BrandsCatalogue from "./BrandsCatalogue";
import BusinessProducts from "./BusinessProducts";
import Profile from "./Profile";
import CompanyData from "./CompanyData";
import MisPedidosCliente from "./MisPedidosCliente";
import CarritoCompras from "./CarritoCompras";

// Components
import { CssBaseline } from "@mui/material";
import AuthenticationContextProvider from "../context/AuthenticationContextProvider";
import BusinessContextProvider from "../context/BusinessContextProvider";
import Podio from "./Podio";

const StyledWrapper = styled(`div`)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  top: 1, // Asegura que el contenedor se expanda verticalmente
}));

const App = () => {
  return (
    <AuthenticationContextProvider>
      <ThemeContextProvider>
        <BusinessContextProvider>
          <CartContextProvider>
            <CssBaseline />
            <header>
              <title>Deliver.ar</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/logo.svg" />
            </header>
            <BrowserRouter>
              <StyledWrapper>
                <Navbar />
                <Routes>
                  <Route path="/*" element={<Home />} />
                  <Route path="/podio" element={<Podio />} />

                  <Route path="/:cid/product/:pid" element={<ProductDetail />} />
                  <Route path="/catalogoEmpresas" element={<BrandsCatalogue />} />
                  {/* Cuando el usuario esta loggeado e ingresa por menu a la opcion "Mis perfil"*/}
                  <Route path="/perfil" element={<Profile />} />
                  {/* Cuando el usuario esta loggeado e ingresa por menu a la opcion "Mis pedidos"*/}
                  <Route path="/purchase/estado/:dni" element={<MisPedidosCliente />} />
                  <Route path="/carrito" element={<CarritoCompras />} />

                  {/* Cuando la empresa loggeada ingresa por menu a la opcion "Mis datos"*/}
                  <Route path="/empresa" element={<CompanyData />} />
                  {/* Cuando la empresa loggeada ingresa por menu a la opcion "Mis productos"*/}
                  <Route
                    path="/businessProducts"
                    element={<BusinessProducts />}
                  />
                </Routes>
              </StyledWrapper>
              <Footer />
            </BrowserRouter>
          </CartContextProvider>
        </BusinessContextProvider>
      </ThemeContextProvider>
    </AuthenticationContextProvider>
  );
};

export default App;
