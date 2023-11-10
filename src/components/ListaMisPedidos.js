import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar'; // Importa el componente Snackbar
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'; // Importa el ícono de cierre
import { obtenerPedidosUsuario } from '../controllers/pedidosController';
import { styled } from '@mui/material/styles';
import GetAppIcon from '@mui/icons-material/GetApp';

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

export default function ListaMisPedidos({ userId }) {
  const [listaPedidos, setListaPedidos] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
    // Verifica si el archivo está disponible
    if (nombreArchivo) {
      // Reemplaza 'URL_DEL_SERVIDOR' con la URL real de tus archivos
      const urlArchivo = `URL_DEL_SERVIDOR/${nombreArchivo}`;

      // Crea un enlace temporal para descargar el archivo
      const link = document.createElement('a');
      link.href = urlArchivo;
      link.download = nombreArchivo;

      // Simula un clic en el enlace para iniciar la descarga
      link.click();
    } else {
      // Muestra el Snackbar si el archivo no está disponible
      setSnackbarOpen(true);
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={tableContainerStyles}>
      <TableContainer>
        <Table sx={{ border: 2, marginBottom: 2, borderRadius: 2 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <ColoredTableCell align="center">ID Pedido</ColoredTableCell>
              <ColoredTableCell align="center">Estado</ColoredTableCell>
              <ColoredTableCell align="center">Estado Pago</ColoredTableCell>
              <ColoredTableCell align="center">Total</ColoredTableCell>
              <ColoredTableCell align="center">Descargar Factura</ColoredTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaPedidos.map((row) => (
              <TableRow key={row.uId}>
                <TableCell align="center" component="th" scope="row">
                  {row.uId}
                </TableCell>
                <TableCell align="center">{row.estado}</TableCell>
                <TableCell align="center">{row.pagado ? 'Pago' : 'Sin pagar'}</TableCell>
                <TableCell align="center">{row.total}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => descargarArchivo(row.nombreArchivo)}
                  >
                    <GetAppIcon />
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
  );
}