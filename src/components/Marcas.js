import React, { useState } from "react";
import { Container, Typography, Grid, Pagination, Box } from "@mui/material";
import MyCard from "./MyCard";
import { useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';


const cardsData = [
  { id: 1, label: "label 1", title: "Tarjeta 1", content: "Contenido de la tarjeta 1", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 2, label: "label 1", title: "Tarjeta 2", content: "Contenido de la tarjeta 2", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 3, label: "label 1", title: "Tarjeta 3", content: "Contenido de la tarjeta 3", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 4, label: "label 1", title: "Tarjeta 4", content: "Contenido de la tarjeta 4", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 5, label: "label 1", title: "Tarjeta 5", content: "Contenido de la tarjeta 5", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 6, label: "label 1", title: "Tarjeta 6", content: "Contenido de la tarjeta 6", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 7, label: "label 1", title: "Tarjeta 7", content: "Contenido de la tarjeta 7", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 8, label: "label 1", title: "Tarjeta 8", content: "Contenido de la tarjeta 8", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 9, label: "label 1", title: "Tarjeta 9", content: "Contenido de la tarjeta 9", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 10, label: "label 1", title: "Tarjeta 10", content: "Contenido de la tarjeta 10", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 11, label: "label 1", title: "Tarjeta 11", content: "Contenido de la tarjeta 11", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
  { id: 12, label: "label 1", title: "Tarjeta 12", content: "Contenido de la tarjeta 12", image: "https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg" },
];


const cardsPerPage = 9; // Tarjetas por página

const top100Films = [
  { categoria: "Comedy", rubro: "Movies" },
  { categoria: "Drama", rubro: "Movies" },
  { categoria: "Action", rubro: "Movies" },
  { categoria: "Documentary", rubro: "Movies" },
  { categoria: "Thriller", rubro: "Movies" },
  { categoria: "Soccer", rubro: "Sports" },
  { categoria: "Basketball", rubro: "Sports" },
  { categoria: "Tennis", rubro: "Sports" },
  { categoria: "Baseball", rubro: "Sports" },
  { categoria: "Hiking", rubro: "Outdoor" },
  { categoria: "Camping", rubro: "Outdoor" },
  { categoria: "Fishing", rubro: "Outdoor" },
  { categoria: "Swimming", rubro: "Outdoor" },
];

const rubrosUnicos = Array.from(new Set(top100Films.map(film => film.rubro)));

const Marcas = () => {
  const location = useLocation(); // Obtén la ubicación actual
  const isMarcasPage = location.pathname === "/marcas";

  const [page, setPage] = useState(1);
  const [selectedRubro, setSelectedRubro] = useState(null);
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, cardsData.length);
  const displayedCards = cardsData.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Filtrar las opciones del segundo filtro en función del rubro seleccionado
  const categoriasPorRubro = selectedRubro
  ? top100Films
      .filter((film) => film.rubro === selectedRubro)
      .map((film) => film.categoria)
  : [];

  return (
    <Container style={{ marginTop: "40px" }}>
    {isMarcasPage && (
      <Grid container spacing={2} alignItems="center" justifyContent="center" marginBottom="40px">
        <Grid item>
          <Autocomplete
            id="filter-demo-1"
            color="primary"
            options={rubrosUnicos}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Rubros" />}
            onChange={(event, newValue) => setSelectedRubro(newValue)}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="filter-demo-2"
            color="primary"
            options={categoriasPorRubro}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Categorías por Rubro" />}
            onChange={(event, newValue) => setSelectedCategoria(newValue)}
          />
        </Grid>
      </Grid>
    )}
    <Grid container spacing={2} marginBottom="60px">
      {displayedCards.map((card) => (
        <Grid item key={card.id} xs={12} sm={6} md={4}>
          <MyCard
            imageSrc={card.image}
            title={card.title}
            description={card.content}
            label={card.label}
          />
        </Grid>
      ))}
    </Grid>
    {isMarcasPage && (
      <Box display="flex" justifyContent="center" marginTop="30px" marginBottom="40px">
        <Pagination
          count={Math.ceil(cardsData.length / cardsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    )}
  </Container>
  );
};

export default Marcas;