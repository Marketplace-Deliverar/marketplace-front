import React, { useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

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
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [carrito, setCarrito] = useState([
    {
      id: 1,
      nombre: "Camiseta",
      precio: 20,
      cantidad: 1,
      imagen: "url_de_tu_imagen_camiseta.jpg",
    },
    {
      id: 2,
      nombre: "Zapatos",
      precio: 50,
      cantidad: 1,
      imagen: "url_de_tu_imagen_zapatos.jpg",
    },
    // Otros productos en el carrito
  ]);

  const removeFromCart = (productId) => {
    const updatedCarrito = carrito.filter(
      (producto) => producto.id !== productId
    );
    setCarrito(updatedCarrito);
  };

  const incrementItem = (productId) => {
    const updatedCarrito = carrito.map((producto) =>
      producto.id === productId
        ? { ...producto, cantidad: producto.cantidad + 1 }
        : producto
    );
    setCarrito(updatedCarrito);
  };

  const decrementItem = (productId) => {
    const updatedCarrito = carrito.map((producto) =>
      producto.id === productId && producto.cantidad > 1
        ? { ...producto, cantidad: producto.cantidad - 1 }
        : producto
    );
    setCarrito(updatedCarrito);
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  };

  const handleClickOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  // Renders
  const renderDialog = () => {
    return (
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>¡Gracias por realizar tu Compra!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tu factura estará disponible en la sección "Mis Pedidos" en los
            próximos días
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => navigate("/")}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <StyledContainer>
      <Typography variant="h3" color="primary" align="center" mb={2}>
        Mi carrito
      </Typography>
      <Grid container gap={2} justifyContent={"center"}>
        <Grid item xs={6}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledCell>Producto</StyledCell>
                  <StyledCell align="center">Cantidad</StyledCell>
                  <StyledCell align="center">Precio Unitario</StyledCell>
                  <StyledCell align="center">Subtotal</StyledCell>
                  <StyledCell align="center">Acciones</StyledCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carrito.map((producto) => (
                  <TableRow key={producto.id}>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar alt={producto.nombre} src={producto.imagen} />
                        <Typography ml={2}>{producto.nombre}</Typography>
                      </div>
                    </TableCell>
                    <TableCell align="center">{producto.cantidad}</TableCell>
                    <TableCell align="center">
                      ${producto.precio.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      ${(producto.precio * producto.cantidad).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => incrementItem(producto.id)}
                      >
                        <AddCircleIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => decrementItem(producto.id)}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => removeFromCart(producto.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <StyledGridBox item xs={4}>
          <Typography variant="h5" color="primary">
            Resumen de Compra
          </Typography>
          <Typography variant="body1">
            Total: ${calcularTotal().toFixed(2)}
          </Typography>
          <Typography variant="body1">Robot a cargo de la entrega:</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpenPopup}
            sx={{ alignSelf: "end" }}
          >
            Finalizar Compra
          </Button>
        </StyledGridBox>
      </Grid>
      {renderDialog()}
    </StyledContainer>
  );
};

export default CarritoCompras;
