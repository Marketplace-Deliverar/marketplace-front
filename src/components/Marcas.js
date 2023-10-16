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

const Marcas = () => {
    const location = useLocation(); // Obtén la ubicación actual
    const isMarcasPage = location.pathname === "/marcas";

    const [page, setPage] = useState(1);

    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = Math.min(startIndex + cardsPerPage, cardsData.length);
    const displayedCards = cardsData.slice(startIndex, endIndex);

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.title,
    });

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
    ];

    // Define tus filtros aquí en un Grid
    const filters = (
        <Grid container spacing={2} alignItems="center" justifyContent="center" marginBottom="40px">
          <Grid item>
            <Autocomplete
              id="filter-demo-1"
              color="primary"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              filterOptions={filterOptions}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Filtro 1" />}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="filter-demo-2"
              color="primary"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              filterOptions={filterOptions}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Filtro 2" />}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="filter-demo-3"
              color="primary"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              filterOptions={filterOptions}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Filtro 3" />}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="filter-demo-4"
              color="primary"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              filterOptions={filterOptions}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Filtro 4" />}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="filter-demo-5"
              color="primary"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              filterOptions={filterOptions}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Filtro 5" />}
            />
          </Grid>
        </Grid>
      );

    return (
        <Container style={{ marginTop: "40px" }}>
            {isMarcasPage && filters}
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