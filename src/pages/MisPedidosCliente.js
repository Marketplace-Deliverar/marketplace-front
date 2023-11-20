import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

// Apis
import { obtenerPedidosUsuario } from "../controllers/pedidosController";

// Styles & icons
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close"; // Importa el ícono de cierre
import GetAppIcon from "@mui/icons-material/GetApp";

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

const StyledTableContainer = styled(TableContainer)({
  width: "60%",
  minHeight: "calc(60vh - 60px)",
});

const ColoredTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const MisPedidosCliente = (props) => {
  //const { uId } = useParams(); // Obtiene el parámetro "uId" de la URL
  const userId = "user_2XLq6Lb94pRk43JtdRmRI0e0PkU"; //TODO: Volver atras y obtenerlo del usuario loggeado en auth context

  const [listaPedidos, setListaPedidos] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const pedidos = await obtenerPedidosUsuario(userId);
        setListaPedidos(pedidos);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    }

    fetchPedidos();
  }, [userId]);

  function descargarArchivo(nombreArchivo) {
    // Verifica si el archivo está disponible
    if (nombreArchivo) {
      // Reemplaza 'URL_DEL_SERVIDOR' con la URL real de tus archivos
      const urlArchivo = `URL_DEL_SERVIDOR/${nombreArchivo}`;

      // Crea un enlace temporal para descargar el archivo
      const link = document.createElement("a");
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
    <StyledContainer>
      <Typography variant="h3" color="primary" align="center" mb={4}>
        Mis pedidos
      </Typography>
      <StyledTableContainer>
        <Table
          sx={{ border: 2, marginBottom: 2, borderRadius: 2 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <ColoredTableCell align="center">ID Pedido</ColoredTableCell>
              <ColoredTableCell align="center">Estado</ColoredTableCell>
              <ColoredTableCell align="center">Estado Pago</ColoredTableCell>
              <ColoredTableCell align="center">Total</ColoredTableCell>
              <ColoredTableCell align="center">
                Descargar Factura
              </ColoredTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaPedidos.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  <Typography variant="caption" color="primary">
                    No tienes pedidos en deliver.ar
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              listaPedidos.map((row) => (
                <TableRow key={row.uId}>
                  <TableCell align="center" scope="row">
                    {row.uId}
                  </TableCell>
                  <TableCell align="center">{row.estado}</TableCell>
                  <TableCell align="center">
                    {row.pagado ? "Pago" : "Sin pagar"}
                  </TableCell>
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
              ))
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="La factura aún no está disponible para descargar"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </StyledContainer>
  );
};

export default MisPedidosCliente;
