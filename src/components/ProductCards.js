import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles & icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Apis
import { obtenerProductosEmpresa } from "../controllers/productoController";

// External Components
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

const ProductCards = ({ empresa }) => {
  const navigate = useNavigate();
  const [listaProductos, setListaProductos] = useState([]);

  useEffect(() => {
    async function fetchProductos() {
      if (empresa !== null && empresa.uId !== undefined) {
        try {
          console.log("empresa.uid", empresa.uid);
          const Productos = await obtenerProductosEmpresa(empresa.uId);
          console.log(Productos);
          setListaProductos(Productos);
        } catch (error) {
          console.error("Error al obtener rubros:", error);
        }
      }
    }
    fetchProductos();
  }, [empresa]);

  const handleCardClick = (cardId) => {
    // Ruta /:cid/product/:pid para navegar al product detail
    navigate("/" + empresa.uId + "/product/" + cardId);
  };

  return (
    <Grid container display="flex" gap={3}>
      {listaProductos.map((card) => (
        <Card
          key={card.uId}
          sx={{ width: 345, height: 400 }}
          onClick={() => handleCardClick(card.uId)}
        >
          <CardHeader title={card.titulo} subheader={card.marca} />
          <CardMedia
            component="img"
            height="194"
            image={card.imagen}
            alt={card.uId}
          />
          <CardContent>
            <Typography variant="h6">${card.precio}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <ShoppingCartIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
};

export default ProductCards;
