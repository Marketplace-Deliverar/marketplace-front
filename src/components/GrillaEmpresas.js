import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Apis
import {
  obtenerEmpresas,
  obtenerRubros,
} from "../controllers/marcasController";

// Styles & icons
import SearchIcon from "@mui/icons-material/Search";

// Custom components
import BrandCard from "./BrandCard";

// External component library
import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";

const cardsPerPage = 9; // Tarjetas por página

const GrillaEmpresas = () => {
  const location = useLocation();
  const isEmpresasPage = location.pathname === "/catalogoEmpresas"; // true cuando viene por path, false cuando esta dentro de home
  const [listaEmpresas, setListaEmpresas] = useState([]);
  const [listaRubros, setListaRubros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRubro, setSelectedRubro] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      // Empresas
      try {
        const empresas = await obtenerEmpresas();
        if (empresas) setListaEmpresas(empresas);
      } catch (error) {
        console.error("Error al obtener empresas:", error);
      }

      // Rubros
      try {
        const rubros = await obtenerRubros();
        setListaRubros(rubros);
      } catch (error) {
        console.error("Error al obtener rubros:", error);
      }

      setLoading(false);
    }

    fetchData();
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
      filtered = filtered.filter(
        (empresa) => empresa.rubro.toLowerCase() === selectedRubro.toLowerCase()
      );
    }

    return filtered;
  };

  const filteredEmpresasArray = filteredEmpresas();

  // Calcular el índice inicial y final según la página actual y el número de tarjetas por página
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = Math.min(
    startIndex + cardsPerPage,
    filteredEmpresasArray?.length
  );
  const displayedCards = filteredEmpresasArray.slice(startIndex, endIndex);

  return (
    <Container style={{ marginTop: "40px" }}>
      {isEmpresasPage && (
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          marginBottom="20px"
        >
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

      {displayedCards?.length === 0 ? (
        loading ? (
          <CircularProgress />
        ) : (
          <Typography
            variant="body1"
            textAlign="center"
            alignSelf="center"
            mb={4}
          >
            Aún no hay empresas
          </Typography>
        )
      ) : (
        <>
          <Grid container spacing={2} marginBottom="40px">
            {displayedCards.map((empresa) => (
              <Grid item key={empresa.uId} xs={12} sm={6} md={4}>
                <BrandCard
                  imageSrc={empresa.logo_svg}
                  title={empresa.razon_social}
                  description={empresa.rubro}
                  label={empresa.uId}
                  url={empresa.url}
                />
              </Grid>
            ))}
          </Grid>
          <>
            {isEmpresasPage && (
              <Box
                display="flex"
                justifyContent="center"
                marginTop="20px"
                marginBottom="40px"
              >
                <Pagination
                  count={Math.ceil(
                    filteredEmpresasArray?.length / cardsPerPage
                  )}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        </>
      )}
    </Container>
  );
};

export default GrillaEmpresas;
