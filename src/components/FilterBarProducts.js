import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Select, MenuItem, Button, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function FilterBarProducts(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleStockChange = (event) => {
    setStockFilter(event.target.value);
  };

  const handleAddProductClick = () => {
    // Implement your logic to add a new product here
    alert('Añadir Producto');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tus productos
        </Typography>
        <TextField
          label="Buscar"
          variant="outlined"
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <Select
          label="Category"
          variant="outlined"
          value={categoryFilter}
          onChange={handleCategoryChange}
        >
          <MenuItem value="All">Todas las categorías</MenuItem>
          <MenuItem value="Category1">Category 1</MenuItem>
          <MenuItem value="Category2">Category 2</MenuItem>
        </Select>
        <Select
          label="Stock"
          variant="outlined"
          value={stockFilter}
          onChange={handleStockChange}
        >
          <MenuItem value="All">Todo el stock</MenuItem>
          <MenuItem value="Sin stock">Sin stock</MenuItem>
          <MenuItem value="Stock manual">Stock manual</MenuItem>
          <MenuItem value="Stock limitado">Stock limitadok</MenuItem>

        </Select>
        <Button variant="contained" color="primary" onClick={handleAddProductClick}>
        Añadir Producto
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default FilterBarProducts;
