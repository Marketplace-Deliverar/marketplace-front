import React, { useEffect } from "react";
import Marcas from "../components/Marcas";
import Tittle from "../components/Tittle";

// Styles
import { styled } from "@mui/material/styles";

// Components

const Home = (props) => {

  return (
    <div>
      <Tittle text='Marcas' color="#1976d2" align="center" padding="50px"></Tittle>
      <Marcas />
    </div>

  );
};

export default Home;
