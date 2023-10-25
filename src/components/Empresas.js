import React, { useState, useEffect } from "react";
import { Container, Grid, Pagination, Box } from "@mui/material";
import MyCard from "./MyCard";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { obtenerEmpresas, obtenerRubros } from "../controllers/marcasController";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const cardsPerPage = 9; // Tarjetas por página

const Empresas = () => {
  const location = useLocation();
  const isEmpresasPage = location.pathname === "/empresas";
  const [listaEmpresas, setListaEmpresas] = useState([]);
  const [listaRubros, setListaRubros] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedRubro, setSelectedRubro] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  useEffect(() => {
    async function fetchData() {
      try {
        const empresas = await obtenerEmpresas();
        setListaEmpresas(empresas);
      } catch (error) {
        console.error("Error al obtener empresas:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchRubros() {
      try {
        const rubros = await obtenerRubros();
        setListaRubros(rubros);
      } catch (error) {
        console.error("Error al obtener rubros:", error);
      }
    }
    fetchRubros();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Actualizar el término de búsqueda al escribir en el cuadro de búsqueda
  };

  // Filtra las empresas según el término de búsqueda y el rubro seleccionado
  const filteredEmpresas = () => {
    let filtered = listaEmpresas;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter((empresa) =>
        empresa.razon_social.toLowerCase().includes(searchTermLower)
      );
    }

    // Filtrar por rubro
    if (selectedRubro) {
      filtered = filtered.filter((empresa) =>
        empresa.rubro.toLowerCase() === selectedRubro.toLowerCase()
      );
    }

    return filtered;
  };

  const filteredEmpresasArray = filteredEmpresas();

  // Calcular el índice inicial y final según la página actual y el número de tarjetas por página
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, filteredEmpresasArray.length);
  const displayedCards = filteredEmpresasArray.slice(startIndex, endIndex);

  return (
    <Container style={{ marginTop: "40px" }}>
      {isEmpresasPage && (
        <Grid container spacing={2} alignItems="center" justifyContent="center" marginBottom="20px">
          <Grid item xs={12} md={9}>
            <TextField
              label="Buscar Marcas"
              value={searchTerm}
              onChange={handleSearchChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              id="filter-demo-1"
              color="primary"
              options={listaRubros}
              sx={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="Rubros" />}
              onChange={(event, newValue) => setSelectedRubro(newValue)}
            />
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2} marginBottom="40px">
        {displayedCards.map((empresa) => (
          <Grid item key={empresa.uId} xs={12} sm={6} md={4}>
            <MyCard
              imageSrc={empresa.logo_svg}
              title={empresa.razon_social}
              description={empresa.rubro}
              label={empresa.uId}
            />
          </Grid>
        ))}
      </Grid>
      {isEmpresasPage && (
        <Box display="flex" justifyContent="center" marginTop="20px" marginBottom="40px">
          <Pagination
            count={Math.ceil(filteredEmpresasArray.length / cardsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default Empresas;
