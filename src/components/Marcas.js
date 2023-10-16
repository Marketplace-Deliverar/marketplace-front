import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import MyCard from "./MyCard";
import MyButton from "./MyButton";

const cardsData = [
    { id: 1, label: "label 1", title: "Tarjeta 1", content: "Contenido de la tarjeta 1", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
    { id: 2, label: "label 1", title: "Tarjeta 2", content: "Contenido de la tarjeta 2", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
    { id: 3, label: "label 1", title: "Tarjeta 3", content: "Contenido de la tarjeta 3", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
    { id: 4, label: "label 1", title: "Tarjeta 4", content: "Contenido de la tarjeta 4", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
    { id: 5, label: "label 1", title: "Tarjeta 5", content: "Contenido de la tarjeta 5", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
    { id: 6, label: "label 1", title: "Tarjeta 6", content: "Contenido de la tarjeta 6", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
    // ... Más tarjetas
];

const Marcas = () => {
    const [page, setPage] = React.useState(1);
    const cardsPerPage = 6; // Cambia esto para ajustar la cantidad de tarjetas por página

    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const displayedCards = cardsData.slice(startIndex, endIndex);

    const h5Style = {
        color: '#1976D2',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '32px',
        fontWeight: 'bold'
    };

    return (
        <Container style={{ paddingBottom: '48px' }}>
            <Typography variant="h5" gutterBottom style={h5Style}>
                Marcas
            </Typography>
            <Grid container spacing={2} style={{ paddingBottom: '28px' }}>
                {displayedCards.map((card) => (
                    <Grid item key={card.id} xs={12} sm={6} md={4}>
                        <MyCard imageSrc={cardsData.image} title={cardsData.title} description={cardsData.content} label={cardsData.label} />
                    </Grid>
                ))}
            </Grid>
            <div style={{ textAlign: 'center' }}>
                <MyButton label='Ver todas' color="primary" disabled={false}></MyButton>
            </div>
        </Container>
    );
};

export default Marcas;