import * as React from "react";

// Styles & context
import "../styles/index.css";
import ThemeContextProvider from "../context/ThemeContextProvider";
import CartContextProvider from "../context/CartContextProvider";
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
import MisDatosCliente from "./MisDatosCliente";
import MisPedidosCliente from "./MisPedidosCliente"
import ProductDetail from "./ProductDetail";
import CarritoCompras from './CarritoCompras';

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
  const [navbarColor, setNavbarColor] = React.useState("#1976d2")
  const domain = window.location.hostname;
  let content;
  let userData = {
    name: "Antonela",
    type: "individuo",
    mail: "antonella@gmail.com",
    dni: "123456",
  }
  localStorage.setItem('user', JSON.stringify(userData));

  //if (domain.startsWith("marketplace.deliver.ar")) {
  if (domain.startsWith("localhost")) {
    content = (
      <Routes>
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
        <Route path="/" element={<><Inicio /></>} />
        <Route path="/login" element={<><SignedIn> <Login /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/empresa" element={<CompanyData />} />
        <Route path="/BusinessProducts" element={<BusinessProducts />} />
        <Route path="/:cid/product/:pid" element={<ProductDetail />} />
        <Route path="/usuarios/:uId" element={<MisDatosCliente />} />
        <Route path="/pedidos/usuario/:uId" element={<MisPedidosCliente />} />
        <Route path="/carrito" element={<CarritoCompras />} />
        <Route path="*" element={<Inicio />} />
      </Routes>
    );
  } else {
    let domain2 = "fravega.marketplace.deliver.ar"
    content = (
      <Routes>
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
        <Route path="/" element={<><HomeBusiness empresaURL={domain2} setNavBarColor={setNavbarColor} /></>} />
        <Route path="/login" element={<><SignedIn> <Login /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/empresa" element={<CompanyData />} />
        <Route path="/BusinessProducts" element={<BusinessProducts />} />
        <Route path="/:cid/product/:pid" element={<ProductDetail />} />
        <Route path="/usuarios/:uId" element={<MisDatosCliente />} />
        <Route path="/pedidos/usuario/:uId" element={<MisPedidosCliente />} />
        <Route path="/carrito" element={<CarritoCompras />} />
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
          <Navbar navBarColor={navbarColor} />
          {content}
        </StyledWrapper>
        <Footer />
      </ClerkProvider >
    );
  };

  return (
    <ThemeContextProvider>
      <CartContextProvider>
        <CssBaseline />
        <header>
          <title>Deliver.ar</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/logo.svg" />
        </header>
        <BrowserRouter>
          <ClerkProviderWithRoutes />
        </BrowserRouter>
      </CartContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
