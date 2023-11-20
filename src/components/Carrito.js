import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Typography,
  Box,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const Carrito = ({carrito=[], setCarrito}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [loteValue, setLoteValue] = useState('');
  console.log("llego al carrito", carrito);

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
    return carrito.reduce((total, producto) => total + producto.price * producto.cantidad, 0);
  }; 
  


  const handleClickOpenPopup = () => {
    setOpenPopup(true);
    console.log('Ir a Pagar');
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setLoteValue(inputValue);
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
                  {carrito?.map((productData) => (
                    <TableRow key={productData?.uId}>
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {productData?.images && productData.images[0] && (
                            <Avatar src={productData.images[0]} />
                          )}
                          <Typography style={{ marginLeft: 10 }}>{productData?.title ?? 'Nombre no disponible'}</Typography>
                        </div>
                      </TableCell>
                      <TableCell align="center">{productData.cantidad}</TableCell>
                      <TableCell align="center">${productData.price.toFixed(2)}</TableCell>
                      <TableCell align="center">${(productData.price * productData.cantidad).toFixed(2)}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => incrementItem(productData.uId)}>
                          <AddCircleIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => decrementItem(productData.uId)}>
                          <RemoveCircleIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => removeFromCart(productData.uId)}>
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
          <Box style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom style={{ color: '#1976d2', textTransform: 'capitalize', fontWeight: 'bold', marginBottom: '30px' }}>
              Resumen de Compra
            </Typography>
            <Typography variant="body1" gutterBottom style={{ color: '#1976d2', marginBottom: '20px' }}>
              Total: ${calcularTotal().toFixed(2)}
            </Typography>

            <Typography variant="body1" gutterBottom style={{ color: '#1976d2' }}>
              Ingrese Lote:
            </Typography>

            <TextField
              required
              label="Ingrese Lote"
              name="Ingrese lote"
              type="number"
              InputProps={{
                inputProps: {
                  min: 1,
                  max: 99,
                },
              }}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <div>
              <Button
                variant="contained"
                color="primary"
                style={{ textTransform: 'capitalize' }}
                onClick={handleClickOpenPopup}
                disabled={!loteValue.trim()}
              >
                Ir a Pagar
              </Button>
            </div>

            {/* Ventana emergente */}
            <Dialog open={openPopup} onClose={handleClosePopup}>
              <DialogTitle>¡Gracias por realizar tu Compra!</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Tu factura estará disponible en la sección "Mis Pedidos" en los próximos días
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={() => navigate("/")}>
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Carrito;
