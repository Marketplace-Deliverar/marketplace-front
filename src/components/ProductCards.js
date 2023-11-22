import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles & icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Apis & context
import { obtenerProductosEmpresa } from "../controllers/productoController";
import { getbrandByURL } from "../apis/brandApis";
import { useAuth } from "../context/AuthenticationContextProvider";

// External Components
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

const ProductCards = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [idEmpresa, setIdEmpresa] = useState("");
  const [loading, setLoading] = useState(false);
  const [listaProductos, setListaProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        let response = await getbrandByURL(user.domain);
        if (response) {
          setIdEmpresa(response.uId);
          const productos = await obtenerProductosEmpresa(response.uId);
          if (productos) setListaProductos(productos);
        }
      } catch (error) {
        console.error("Error al obtener empresa y/o productos:", error);
      }

      setLoading(false);
    };

    if (!isAuthenticated) navigate("/");
    fetchProductos();
  }, []);

  const handleCardClick = (cardId) => {
    // Ruta /:cid/product/:pid para navegar al product detail
    navigate("/" + idEmpresa + "/product/" + cardId);
  };

  return (
    <Grid container display="flex" gap={3}>
      {listaProductos.length === 0 ? (
        <Grid item xs={10} textAlign="center" mt={20}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="caption">
              La empresa no tiene productos disponibles
            </Typography>
          )}
        </Grid>
      ) : (
        listaProductos.map((card, index) => (
          <Card
            key={index}
            sx={{ width: 345, height: 400 }}
            onClick={() => handleCardClick(card.uId)}
          >
            <CardHeader title={card.titulo} subheader={card.marca} />
            <CardMedia
              component="img"
              height="194"
              image={card.imagen}
              alt={card.uId + "-" + index}
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
        ))
      )}
    </Grid>
  );
};

export default ProductCards;
