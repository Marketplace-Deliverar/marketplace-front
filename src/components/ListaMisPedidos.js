import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import zIndex from '@mui/material/styles/zIndex';

function createData(idPedido, fecha, direccion, tiempo, estado, total) {
  return { idPedido, fecha, direccion, tiempo, estado, total};
}

const rows = [
  createData(1, "1/10/2023", "Lima 123", 12,"Entregado", "$100"),
  createData(2, "15/10/2023", "Av. Cabildo 941", 15, "En camino", "$220"),
  createData(3, "20/10/2023", "Bulnes 500", 26,"Entregado", "$110"),
  createData(4, "30/10/2023", "Gorostiaga 1912",32, "Cancelado", "$150"),
  createData(5, "4/11/2023", "Pueyrredon 1023", 40, "En camino", "$140"),
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper} sx={{maxWidth:1500}} >
      <Table sx={{ minWidth: 650, border: 2, marginBottom: 2, borderRadius: 2}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID Pedido</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Dirección&nbsp;</TableCell>
            <TableCell align="right">Tiempo de entrega (min)</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.idPedido}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.idPedido}
              </TableCell>
              <TableCell align="right">{row.fecha}</TableCell>
              <TableCell align="right">{row.direccion}</TableCell>
              <TableCell align="right">{row.tiempo}</TableCell>
              <TableCell align="right">{row.estado}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
