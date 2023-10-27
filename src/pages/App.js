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
import MisDatosCliente from "./MisDatosCliente";
import MisPedidosCliente from "./MisPedidosCliente"
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
  const [navbarColor, setNavbarColor] = React.useState("#1976d2")
  const domain = window.location.hostname;
  let content;

  if (domain.startsWith("marketplace.deliver.ar")) {
    content = (
      <Routes>
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
        <Route path="/" element={<><Inicio /></>} />
        <Route path="/login" element={<><SignedIn> <Login /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/empresas" element={<><SignedIn> <Empresas /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/empresa" element={<><SignedIn> <CompanyData /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/BusinessProducts" element={<><SignedIn> <BusinessProducts /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/:cid/product/:pid" element={<><SignedIn><ProductDetail /></SignedIn><SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/usuarios/:uId" element={<><SignedIn><MisDatosCliente /></SignedIn><SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/pedidos/usuario/:uId" element={<><SignedIn><MisPedidosCliente /></SignedIn><SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="*" element={<><SignedIn><Inicio /></SignedIn><SignedOut><RedirectToSignIn /></SignedOut></>} />
      </Routes>
    );
  } else {
    content = (
      <Routes>
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
        <Route path="/" element={<><HomeBusiness empresaURL={domain} setNavBarColor={setNavbarColor} /></>} />
        <Route path="/login" element={<><SignedIn> <Login /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/empresas" element={<><SignedIn> <Empresas /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/empresa" element={<><SignedIn> <CompanyData /> </SignedIn> <SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/usuarios/:uId" element={<><SignedIn><MisDatosCliente /></SignedIn><SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path="/pedidos/usuario/:uId" element={<><SignedIn><MisPedidosCliente /></SignedIn><SignedOut><RedirectToSignIn /></SignedOut></>} />
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
