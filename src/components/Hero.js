import React from "react";
import background from '../media/background.jpg';
import { Typography, Paper, Container, Grid } from '@mui/material';
import Description from "../components/Description";
import MyButton from "../components/MyButton";

export default function Hero() {

    const descriptionText = "Bienvenidos a Deliver.ar, la innovadora solución de entrega a domicilio que \n\nestá revolucionando la forma en que recibes tus pedidos en Lago Escobar. \n\n ¿Te imaginas recibir tus alimentos favoritos, productos de tiendas locales y \n\nmás, entregados por adorables robots repartidores?\n\n¡En Deliver.ar, lo hacemos posible!";
    
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
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    };
    const paperStyle = {
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        textAlign: 'left',
        position: 'absolute',
        top: '50%',
        left: '25%',
        transform: 'translate(-50%, -50%)',
        border: "none",
        boxShadow: "none",
    };

    const h5Style = {
        color: '#FF6B35',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '14px',
    };

    const h1Style =  {
        color: '#FFFFFF',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '38px',
        fontWeight: 'bold'
    };
    

    return (
        <Container maxWidth="xl" style={containerStyle}>
        <img src={background} alt="Background" style={imageStyle} />
        <div style={overlayStyle}></div>
        <Paper style={paperStyle}>
            <Typography variant="h5" gutterBottom style={h5Style}>
                INDUSTRIAS ARGENTINAS
            </Typography>
            <Typography variant="h3" gutterBottom style={h1Style}>
                Deliver.ar
            </Typography>
            <Description text={descriptionText} gutterBottom />
            <br></br>
            <MyButton label='Ver más' color="primary" disabled={false}></MyButton>
        </Paper>
    </Container>
    );
}
