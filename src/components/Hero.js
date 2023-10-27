import React from "react";
import background from '../media/background.jpg';
import { Typography, Paper, Container } from '@mui/material';
import Description from "../components/Description";
import MyButton from "../components/MyButton";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Hero() {
  const descriptionText = "Bienvenidos a Deliver.ar, la innovadora solución de entrega a domicilio que está revolucionando la forma en que recibes tus pedidos en Lago Escobar. ¿Te imaginas recibir tus alimentos favoritos, productos de tiendas locales y más, entregados por adorables robots repartidores? ¡En Deliver.ar, lo hacemos posible!";

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  const imageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  };

  const isMobile = useMediaQuery('(max-width:600px)'); // Detectar si es un dispositivo móvil

  const paperStyle = {
    padding: isMobile ? '10px' : '30px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    textAlign: 'left',
    position: 'absolute',
    top: isMobile ? '40%' : '50%',
    left: isMobile ? '0%' : '25%',
    transform: isMobile ? '' : 'translate(-50%, -30%)',
    border: "none",
    boxShadow: "none",
    maxWidth: isMobile ? '100%' : '50%',
    whiteSpace: isMobile ? 'nowrap' : 'pre-line',
    color: '#FFFFFF', // Establecer el color de texto en blanco
  };

  const h5Style = {
    color: '#FF6B35',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: isMobile ? '12px' : '14px',
  };

  const h1Style = {
    color: '#FFFFFF',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: isMobile ? '28px' : '38px',
    fontWeight: 'bold',
  };

  return (
    <Container maxWidth={false} style={containerStyle}>
      <img src={background} alt="Background" style={imageStyle} />
      <div style={overlayStyle}></div>
      <Paper style={paperStyle}>
        <Typography variant="h5" gutterBottom style={h5Style}>
          INDUSTRIAS ARGENTINAS
        </Typography>
        <Typography variant="h3" gutterBottom style={h1Style}>
          Deliver.ar
        </Typography>
        <Typography style={{ whiteSpace: 'pre-line' }} gutterBottom>
          {descriptionText}
        </Typography>
      </Paper>
    </Container>
  );
}