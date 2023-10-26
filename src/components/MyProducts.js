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


function createData(imagen, name, price, category, description, stock, amount) {
    return { imagen, name, price, category, description, stock, amount };
  }
  
  const rows = [
    createData("https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg", 'Prod1', 159, 'Cat1', 'descripción', false, 0),
    createData("https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg", 'Prod2', 159, 'Cat1', 'descripción', true, 99),
    createData("https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg", 'Prod3', 159, 'Cat1', 'descripción', false, 0),
    createData("https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg", 'Prod4', 159, 'Cat1', 'descripción', true, 0),
    createData("https://thumbs.dreamstime.com/b/etiqueta-engomada-del-ejemplo-121022914.jpg", 'Prod5', 159, 'Cat1', 'descripción', false, 0),
  ];
  
  export default function MyProducts() {
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
            <TableCell>Imagen</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Categoría</TableCell>
            <TableCell align="right">Descripción</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right">Disponibilidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: row.amount === 0 && row.stock ? 'rgba(255, 0, 0, 0.2)' : 'inherit',
              }}
            >
              <TableCell component="th" scope="row">
                <img src={row.imagen} alt={row.name} width="50" height="50" />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">
                {row.stock ? 'Stock limitado' : 'Stock manual'}
              </TableCell>
              <TableCell align="right">
                {row.stock ? (
                  row.amount === 0 ? (
                    <span style={{ color: 'red' }}>0</span>
                  ) : (
                    row.amount
                  )
                ) : (
                  <Checkbox
                    checked={checkedStates[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                )}
              </TableCell>
              <TableCell align="right">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}