import React, { useEffect } from "react";

// Styles
import { styled } from "@mui/material/styles";

// Components

import Hero from "../components/Hero";
import Marcas from "../components/Marcas";
import MyButton from "../components/MyButton";
import { Link,  } from "react-router-dom";
import Tittle from "../components/Tittle";

const Home = (props) => {

  return (
    <div>
      <Hero />
      <Tittle text='Marcas' color="#1976d2" align="center"></Tittle>
      <Marcas />
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <Link to="/marcas">
          <MyButton label="Ver todas" color="primary" disabled={false} />
        </Link>
      </div>
    </div>

  );
};

export default Home;
