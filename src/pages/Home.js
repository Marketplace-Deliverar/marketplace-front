import React, { useEffect } from "react";

// Styles
import { styled } from "@mui/material/styles";

// Components

import Hero from "../components/Hero";
import Marcas from "../components/Marcas";
import Footer from "../components/Footer";

const Home = (props) => {

  return (
    <div>
      <Hero />
      <Marcas />
    </div>

  );
};

export default Home;
