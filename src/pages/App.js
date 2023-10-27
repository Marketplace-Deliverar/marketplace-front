import * as React from "react";

// Styles & context
import "../styles/index.css";
import ThemeContextProvider from "../context/ThemeContextProvider";
import { styled } from "@mui/material/styles";

// Custom components
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarBusiness from "../components/NavbarBusiness";
import Login from "./Login";
import HomeBusiness from "./HomeBusiness";
import BusinessProducts from "./BusinessProducts";
import ScrollToTop from "../components/ScrollToTop";
import Inicio from "./Inicio";
import Empresas from "./Empresas";
import CompanyData from "./CompanyData";
import ProductDetail from "./ProductDetail";

// Components
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

// Clerk
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";
import { esES } from "@clerk/localizations";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const StyledWrapper = styled(`div`)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  top: 1, // Asegura que el contenedor se expanda verticalmente
}));

const App = () => {
  const domain = window.location.hostname;
  let content;

  const obtenerDatosEmpresa = (dominio) => {
    fetch(
      `https://xorn7asoxb4eecmwmszz5fbc3a0wamui.lambda-url.us-east-1.on.aws/empresas/url/${dominio}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Aquí puedes trabajar con los datos recibidos en formato JSON
        console.log(data);
      })
      .catch((error) => {
        console.error("Hubo un problema con la solicitud fetch:", error);
      });
  };

  console.log(domain);

  let datos = obtenerDatosEmpresa("carrefour.marketplace.deliver.ar");
  // let datos = obtenerDatosEmpresa(domain)
  content = (
    <Routes>
      <Route
        path="/*"
        element={
          domain.startsWith("localhost") ? (
            <Inicio />
          ) : (
            <HomeBusiness empresa={datos} />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/empresas" element={<Empresas />} />
      <Route path="/empresa" element={<CompanyData />} />
      <Route path="/HomeBusiness" element={<HomeBusiness />} />
      <Route path="/BusinessProducts" element={<BusinessProducts />} />
      <Route path="/:cid/product/:pid" element={<ProductDetail />} />
    </Routes>
  );

  if (domain.startsWith("marketplace.deliver.ar")) {
    // if (domain.startsWith("localhost")) {
    content = (
      <Routes>
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
        <Route path="/" element={<><Inicio /></>} />
        <Route path="/login" element={<><SignedIn> <Login /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/empresas" element={<><SignedIn> <Empresas /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/empresa" element={<><SignedIn> <CompanyData /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/BusinessProducts" element={<><SignedIn> <BusinessProducts /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="*" element={<><SignedIn><Inicio /></SignedIn><SignedOut><RedirectToSignIn /></SignedOut></>} />
      </Routes>
    );
  } else {
    // let datos = obtenerDatosEmpresa("carrefour.marketplace.deliver.ar")
    let datos = obtenerDatosEmpresa(domain)
    content = (
      <Routes>
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
        <Route path="/" element={<><HomeBusiness empresa={datos} /></>} />
        <Route path="/login" element={<><SignedIn> <Login /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/empresas" element={<><SignedIn> <Empresas /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/empresa" element={<><SignedIn> <CompanyData /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/BusinessProducts" element={<><SignedIn> <BusinessProducts /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="*" element={<><Inicio /></>} />
      </Routes>
    );
  }

  function ClerkProviderWithRoutes() {
    const navigate = useNavigate();

    return (
      <ClerkProvider
        localization={esES}
        publishableKey={clerkPubKey}
        navigate={(to) => navigate(to)}
      >
        <StyledWrapper>
          <Navbar />
          {content}
        </StyledWrapper>
        <Footer />
      </ClerkProvider >
    );
  };

  return (
    <ThemeContextProvider>
      <CssBaseline />
      <header>
        <title>Deliver.ar</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.svg" />
      </header>
      <BrowserRouter>
        <ClerkProviderWithRoutes />
      </BrowserRouter>
    </ThemeContextProvider>
  );
};

export default App;
