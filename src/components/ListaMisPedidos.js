import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { obtenerPedidosUsuario } from '../controllers/pedidosController';
import { styled } from '@mui/material/styles';

const tableContainerStyles = {
  width: '80%',
  margin: '0 auto',
  paddingTop: '70px',
  paddingBottom: '100px',
  minHeight: 'calc(60vh - 60px)', // Ajusta la altura según tu necesidad
};

const ColoredTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export default function ListaMisPedidos({ userId }) {
  const [listaPedidos, setListaPedidos] = useState([]);

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const pedidos = await obtenerPedidosUsuario(userId);
        setListaPedidos(pedidos);
        console.log(pedidos)
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    }
    fetchPedidos();
  }, [userId]);

  return (
    <div style={tableContainerStyles}>
      <TableContainer>
        <Table sx={{ border: 2, marginBottom: 2, borderRadius: 2 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <ColoredTableCell align="center">ID Pedido</ColoredTableCell>
              <ColoredTableCell align="center">Estado</ColoredTableCell>
              <ColoredTableCell align="center">Fecha Entrega</ColoredTableCell>
              <ColoredTableCell align="center">Tiempo Entrega (min)</ColoredTableCell>
              <ColoredTableCell align="center">Estado Pago</ColoredTableCell>
              <ColoredTableCell align="center">Total</ColoredTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaPedidos.map((row) => (
              <TableRow key={row.uId}>
                <TableCell align="center" component="th" scope="row">
                  {row.uId}
                </TableCell>
                <TableCell align="center">{row.estado}</TableCell>
                <TableCell align="center">{row.fecha_entrega}</TableCell>
                <TableCell align="center">{row.tiempo_delivery}</TableCell>
                <TableCell align="center"> {row.pagado ? 'Pago' : 'Sin pagar'}</TableCell>
                <TableCell align="center">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
