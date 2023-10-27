import MyProducts from "../components/MyProducts";
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import {obtenerProductosEmpresa} from "../controllers/productoController";


export default function BusinessProducts() {

  const [listaProductos, setListaProductos] = useState([]);
  
  useEffect(() => {
    async function fetchProductos() {
      try {
        const Productos = await obtenerProductosEmpresa(1849171299);
        setListaProductos(Productos)
      } catch (error) {
        console.error("Error al obtener rubros:", error);
      }
    }
    fetchProductos();
  }, []);

  
  
  return (
    <Box sx={{ marginY: 4 }}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box
          sx={{
            backgroundColor: "#1976D2",
            padding: 2,
            margin: 2,
            borderRadius: 2,
            marginTop: 3
          }}
        >
          <Box sx={{ marginBottom: 1 }}>
            <Button variant="text">
              <Typography
                variant="inherit"
                style={{
                  color: "#FFFFFF",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 400,
                  textTransform: "none",
                }}
              >
                Mis Datos
              </Typography>
            </Button>
          </Box>
          <Box>
            <Button variant="text">
              <Typography
                variant="inherit"
                style={{
                  color: "#FFFFFF",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 400,
                  textTransform: "none",
                }}
              >
                Mis Productos
              </Typography>
            </Button>
          </Box>
        </Box>
        </Grid>
        <Grid item xs={8} sx={{marginY: 4}}>
        <Typography component="h1" variant="h5" sx={{marginBottom:2, marginLeft: 2}}>
            Mis Productos
        </Typography>
        <Box sx={{ margin: 2, borderRadius: 2}}>
            <MyProducts rows={listaProductos}></MyProducts>  
        </Box>
      </Grid>
    </Grid>
  </Box>
  );
}
