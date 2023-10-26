import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react'; 
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
  
  export default function MyProducts({rows}) {
    const [checkedStates, setCheckedStates] = useState(rows.map(row => true));
  
    const handleCheckboxChange = (index) => {
      const newCheckedStates = [...checkedStates];
      newCheckedStates[index] = !newCheckedStates[index];
      setCheckedStates(newCheckedStates);
    };
  
    const handleEditClick = (index) => {
        // Aquí puedes implementar la lógica para editar el producto en base al índice.
        // Puedes abrir un modal o una página de edición, por ejemplo.
        console.log(`Editar producto: ${rows[index].name}`);
      };
      
      const handleDeleteClick = (index) => {
        // Aquí puedes implementar la lógica para eliminar el producto en base al índice.
        // Puedes mostrar un cuadro de diálogo de confirmación antes de eliminar.
        console.log(`Eliminar producto: ${rows[index].name}`);
      };

    return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Imagen</TableCell>
            <TableCell align="left">Producto</TableCell>
            <TableCell align="left">Precio</TableCell>
            <TableCell align="left">Categoría</TableCell>
            <TableCell align="left">Descripción</TableCell>
            <TableCell align="left">Stock</TableCell>
            <TableCell align="left">Disponibilidad</TableCell>
            {/* <TableCell align="left">Acciones</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.titulo}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: row.nro_stock === 0 && row.stock ? 'rgba(255, 0, 0, 0.2)' : 'inherit',
              }}
            >
              <TableCell component="th" scope="row" align="left">
                <img src={row.imagen} alt={row.titulo} width="50" height="50" />
              </TableCell>
              <TableCell component="th" scope="row" align="left">
                {row.titulo}
              </TableCell>
              <TableCell align="left">{row.precio}</TableCell>
              <TableCell align="left">{row.categoria}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">
                {row.stock ? 'Stock limitado' : 'Stock manual'}
              </TableCell>
              <TableCell align="left">
                {row.stock ? (
                  row.nro_stock === 0 ? (
                    <span style={{ color: 'red' }}>0</span>
                  ) : (
                    row.nro_stock
                  )
                ) : (
                  <Checkbox
                    checked={checkedStates[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                )}
              </TableCell>
              {/* <TableCell align="right">
                <IconButton
                  onClick={() => handleEditClick(index)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteClick(index)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}