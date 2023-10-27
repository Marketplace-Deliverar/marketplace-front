import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { obtenerProductosEmpresa } from "../controllers/productoController"
import { useNavigate } from "react-router-dom";


export default function ProductCards({ empresa }) {

  const navigate = useNavigate()

  const [listaProductos, setListaProductos] = useState([]);

  console.log("empresa", empresa)


  useEffect(() => {
    async function fetchProductos() {
      if (empresa !== null && empresa.uId !== undefined) {
        try {
          console.log("empresa.uid", empresa.uid)
          const Productos = await obtenerProductosEmpresa(empresa.uId);
          console.log(Productos)
          setListaProductos(Productos)
        } catch (error) {
          console.error("Error al obtener rubros:", error);
        }
      }
    }
    fetchProductos();
  }, [empresa]);

  const handleCardClick = (cardId) => {
    navigate("/" + empresa.uId + "/product/" + cardId)
    //aca va la opcion de redirigir
    console.log(`Clic en tarjeta ${cardId}`);
  };


  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
      {listaProductos.map((card) => (
        <div key={card.uId} onClick={() => handleCardClick(card.uId)}>
          <Card key={card.uId} sx={{ width: 345, height: 400, margin: "16px" }}>
            <CardHeader title={card.titulo}  subheader={card.marca} />
            <CardMedia component="img" height="194" image={card.imagen} alt={card.uId} />
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                ${card.precio} 
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <ShoppingCartIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
}