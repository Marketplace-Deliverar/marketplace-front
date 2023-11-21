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
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';

export default function MyProducts({rows}) {
  const [checkedStates, setCheckedStates] = useState(rows.map(row => true));

  const handleCheckboxChange = (index) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    selectedRubros: "",
    listaRubros: [],
    listaCategorias: [],
    selectedCategorias: "",
    stock: "",
    marca: "",
    titulo: "",
    descripcion: "",
    precio: "",
    stockNumber: "",
  });

  const handleEditClick = (index) => {
    const selectedProduct = rows[index];
    setEditedProduct({
      selectedRubros: selectedProduct.rubro,
      selectedCategorias: selectedProduct.categoria,
      stock: selectedProduct.stock,
      marca: selectedProduct.marca,
      titulo: selectedProduct.titulo,
      descripcion: selectedProduct.description,
      precio: selectedProduct.precio,
      stockNumber: selectedProduct.nro_stock,
    });
    setIsEditModalOpen(true);
  };
  
  const handleEditSubmit = () => {
    // Aquí puedes implementar la lógica para guardar los cambios en el producto.
    // Accede a los valores de los campos del formulario y actualiza el producto.
    setIsEditModalOpen(false); // Cierra el modal después de guardar los cambios.
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
    <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
      <DialogTitle>Editar Producto</DialogTitle>
      <DialogContent>
        <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>Título:</label>
            <Input
              type="text"
              name="titulo"
              value={editedProduct.titulo}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, titulo: e.target.value })
              }
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          <div>
            <label>Marca:</label>
            <Input
              type="text"
              name="marca"
              value={editedProduct.marca}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, marca: e.target.value })
              }
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          <div>
            <label>Descripción:</label>
            <Input
              name="descripcion"
              value={editedProduct.descripcion}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, descripcion: e.target.value })
              }
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          <div>
            <label>Precio:</label>
            <Input
              type="number"
              name="precio"
              value={editedProduct.precio}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, precio: e.target.value })
              }
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          <div>
              <label>Stock:</label>
              <Select
                value={editedProduct.stock ? 'Si' : 'No'}
                onChange={(e) => {
                  const isStockPermanent = e.target.value === 'Si';
                  setEditedProduct({ ...editedProduct, stock: isStockPermanent });
                }}
                style={{ width: '100%' }}
              >
                <MenuItem value="Si">Si</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </div>
          <div>
            <label>Número de Stock:</label>
            <Input
              type="number"
              name="numeroStock"
              value={editedProduct.stockNumber}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, stockNumber: e.target.value })
              }
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          <div>
            <Button type="submit" variant="contained" color="primary">
              Guardar Cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

  </TableContainer>
);
}