import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';

// Apis
import { obtenerPedidosUsuario } from "../controllers/pedidosController";

// Styles & icons
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close"; // Importa el ícono de cierre
import GetAppIcon from "@mui/icons-material/GetApp";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// Custom components

// External component library
import {
  IconButton,
  Snackbar,
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

const tableContainerStyles = {
  width: '60%',
  margin: '0 auto',
  paddingTop: '70px',
  paddingBottom: '100px',
  minHeight: 'calc(60vh - 60px)',
};

const ColoredTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const MisPedidosCliente = () => {
  const userId = "8337531602"; //TODO: Agarrarlo del context
  const [listaPedidos, setListaPedidos] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  async function fetchPedidos() {
    try {
      const pedidos = await obtenerPedidosUsuario(userId);
      setListaPedidos(pedidos);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  }

  useEffect(() => {
    fetchPedidos();
  }, [userId]);

  function descargarArchivo(nombreArchivo) {
    if (nombreArchivo) {
      const urlArchivo = `URL_DEL_SERVIDOR/${nombreArchivo}`;
      const link = document.createElement('a');
      link.href = urlArchivo;
      link.download = nombreArchivo;
      link.click();
    } else {
      setSnackbarOpen(true);
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCarritoClick = () => {
    // Usa navigate en lugar de history.push
    navigate('/');
  };

  return (
    <StyledContainer>
      <Typography variant="h3" color="primary" align="center" mb={4}>
        Mis pedidos
      </Typography>
      <div style={tableContainerStyles}>
        <TableContainer>
          <Table sx={{ border: 2, marginBottom: 2, borderRadius: 2 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <ColoredTableCell align="center">ID Pedido</ColoredTableCell>
                <ColoredTableCell align="center">Estado Pago</ColoredTableCell>
                <ColoredTableCell align="center">Total</ColoredTableCell>
                <ColoredTableCell align="center">Descargar Factura</ColoredTableCell>
                <ColoredTableCell align="center">Estado Pedido</ColoredTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listaPedidos.map((row) => (
                <TableRow key={row.uId}>
                  <TableCell align="center" component="th" scope="row">
                    {row.uId}
                  </TableCell>
                  <TableCell align="center">{row.pagado ? 'Pago' : 'Sin pagar'}</TableCell>
                  <TableCell align="center">{row.total}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => descargarArchivo(row.nombreArchivo)}>
                      <GetAppIcon />
                    </IconButton>

                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={handleCarritoClick}>
                      <LocalShippingIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message="La factura aún no está disponible para descargar"
          action={
            <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </div>
    </StyledContainer>
  );
};

export default MisPedidosCliente;
