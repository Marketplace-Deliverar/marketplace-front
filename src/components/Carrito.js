import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar, Typography, Box, Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export const Carrito = () => {
  const [carrito, setCarrito] = React.useState([
    { id: 1, nombre: 'Camiseta', precio: 20, cantidad: 1, imagen: 'url_de_tu_imagen_camiseta.jpg' },
    { id: 2, nombre: 'Zapatos', precio: 50, cantidad: 1, imagen: 'url_de_tu_imagen_zapatos.jpg' },
    // Otros productos en el carrito
  ]);

  const removeFromCart = (productId) => {
    const updatedCarrito = carrito.filter((producto) => producto.id !== productId);
    setCarrito(updatedCarrito);
  };

  const incrementItem = (productId) => {
    const updatedCarrito = carrito.map((producto) =>
      producto.id === productId ? { ...producto, cantidad: producto.cantidad + 1 } : producto
    );
    setCarrito(updatedCarrito);
  };

  const decrementItem = (productId) => {
    const updatedCarrito = carrito.map((producto) =>
      producto.id === productId && producto.cantidad > 1 ? { ...producto, cantidad: producto.cantidad - 1 } : producto
    );
    setCarrito(updatedCarrito);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  };

  return (
    <div style={{ margin: '0 40px', marginBottom: '40px' }}>
      <Grid container spacing={3} style={{ paddingTop: '40px' }}>
        <Grid item xs={12} sm={8}>
          <div>
            <TableContainer component={Paper} style={{ padding: '20px', maxWidth: '900px', float: 'left' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ color: '#1976d2' }}>Producto</TableCell>
                    <TableCell style={{ color: '#1976d2' }} align="center">Cantidad</TableCell>
                    <TableCell style={{ color: '#1976d2' }} align="center">Precio Unitario</TableCell>
                    <TableCell style={{ color: '#1976d2' }} align="center">Subtotal</TableCell>
                    <TableCell style={{ color: '#1976d2' }} align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {carrito.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar alt={producto.nombre} src={producto.imagen} />
                          <Typography style={{ marginLeft: 10 }}>{producto.nombre}</Typography>
                        </div>
                      </TableCell>
                      <TableCell align="center">{producto.cantidad}</TableCell>
                      <TableCell align="center">${producto.precio.toFixed(2)}</TableCell>
                      <TableCell align="center">${(producto.precio * producto.cantidad).toFixed(2)}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => incrementItem(producto.id)}>
                          <AddCircleIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => decrementItem(producto.id)}>
                          <RemoveCircleIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => removeFromCart(producto.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
            <Typography variant="h5" gutterBottom style={{ color: '#1976d2', textTransform: 'capitalize', fontWeight: 'bold', marginBottom: '30px' }}>
              Resumen del Carrito
            </Typography>
            <Typography variant="body1" gutterBottom style={{ color: '#1976d2', marginBottom: '10px' }}>
              Total: ${calcularTotal().toFixed(2)}
            </Typography>
            <Typography variant="body1" gutterBottom style={{ color: '#1976d2', marginBottom: '10px' }}>
              Tiempo estimado de entrega:
            </Typography>
            <Typography variant="body1" gutterBottom style={{ color: '#1976d2', marginBottom: '30px' }}>
              Robot a cargo de la entrega:
            </Typography>
            <Button variant="contained" color="primary" style={{ textTransform: 'capitalize' }}>
              Finalizar Compra
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Carrito;
