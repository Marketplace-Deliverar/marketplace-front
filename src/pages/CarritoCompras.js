import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styles & icons
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

// External component library
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TextField,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useCartContext } from "../context/CartContextProvider";
import { enviarCarrito } from "../controllers/carritoController";
import { useAuth } from "../context/AuthenticationContextProvider";
import { getbrandByURL } from "../apis/brandApis";

const StyledContainer = styled(`div`)({
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  marginTop: "2rem",
});

const StyledGridBox = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  textAlign: "start",
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
}));

const StyledCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const CarritoCompras = (props) => {
  const { cart, removeFromCart, updateCart } = useCartContext();
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [loteValue, setLoteValue] = useState('');
  const { isAuthenticated, user } = useAuth();
  let businessName;
  let cuit;


  //windows.location
  const incrementItem = (productId) => {
    const updatedCarrito = cart.map((producto) =>
      producto.id === productId ? { ...producto, cantidad: producto.cantidad + 1 } : producto
    );
    updateCart(updatedCarrito);
  };

  const decrementItem = (productId) => {
    const updatedCarrito = cart.map((producto) =>
      producto.id === productId && producto.cantidad > 1 ? { ...producto, cantidad: producto.cantidad - 1 } : producto
    );
    updateCart(updatedCarrito);
  };

  const calcularTotal = () => {
    return cart.reduce((total, producto) => total + producto.price * producto.cantidad, 0);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setLoteValue(inputValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await getbrandByURL(window.location.businessName);
        console.log("response:", response)
        if (response) {
          businessName = response.businessName;
          cuit = response.cuit;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const enviar_a_pagos = async (cart) => {
    console.log("Llega a enviar carrito", cart);

    try {
      const carrito = {
        product_name: cart[0].title,
        product_price: cart[0].price,
        product_amount: cart[0].cantidad,
        product_marketplace: businessName, //ver
        product_marketplace_cuit: cuit, //ver
        delivery_lot: loteValue,
        user_name: user.name,
        user_email: user.email,
        user_document: user.dni,
      };

      console.log("Datos del carrito a enviar", carrito);

      const response = await enviarCarrito(carrito);

      if (response.rdo === 0) {
        console.error("OK Post");

      } else {

        console.error("Error en la respuesta del servidor:", response.mensaje);
        alert("Error al procesar el pago. Inténtelo nuevamente o contacte al soporte.");
      }
    } catch (error) {
      console.error("Error en la solicitud de envío de carrito:", error);

    }
  };

  return (
    <StyledContainer>
      <Typography variant="h4" color="primary" align="center" style={{ fontWeight: 'bold' }} mb={2}>
        Mi carrito
      </Typography>
      <div style={{ margin: '0 40px', marginBottom: '40px' }}>
        <Grid container spacing={3} style={{ paddingTop: '40px' }}>
          <Grid item xs={12} sm={8}>
            <div style={{ marginRight: '150px' }}>
              <TableContainer component={Paper} style={{ padding: '20px', width: '130%', margin: 'left' }}>
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
                    {cart?.map((productData) => (
                      <TableRow key={productData?.id}>
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
                          <IconButton color="primary" onClick={() => incrementItem(productData.id)}>
                            <AddCircleIcon />
                          </IconButton>
                          <IconButton color="primary" onClick={() => decrementItem(productData.id)}>
                            <RemoveCircleIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => removeFromCart(productData.id)}>
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
            <Box style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', textAlign: 'left' }}>
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
                  onClick={() => {
                    enviar_a_pagos(cart);
                  }}
                  disabled={!loteValue.trim()}
                >
                  Ir a Pagar
                </Button>
              </div>
            </Box>
          </Grid>
        </Grid>
      </div>
    </StyledContainer>
  );
};

export default CarritoCompras;
