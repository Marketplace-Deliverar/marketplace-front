import MyProducts from "../components/MyProducts";
import React, { useEffect, useState, useRef  } from "react";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import {obtenerProductosEmpresa, obtenerCategoriasRubro, crearProducto} from "../controllers/productoController";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Modal from "@mui/material/Modal";
import Input from '@mui/material/Input';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {obtenerRubros} from "../controllers/marcasController";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function BusinessProducts() {

  const [listaProductos, setListaProductos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRubros, setSelectRubros] = useState("");
  const [listaRubros, setListaRubros] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [selectedCategorias, setSelectCategorias] = useState("");
  const [stock, setStock] = useState("");
  const [marca, setMarca] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stockNumber, setStockNumber] = useState("");

  const formRef = useRef(null);

  const handleChange = (event) => {
    setStock(event.target.value);
  };

  const handleChangeRubro = (event) => {
    setSelectRubros(event.target.value); 
  };

  const handleChangeCategoria = (event) => {
    setSelectCategorias(event.target.value); 
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget); 
    const newData = {
      id_empresa: "1849171299",
      titulo: data.get('titulo'),
      marca: data.get('marca'),
      description: data.get('descripcion'),
      precio: parseInt(data.get('precio'), 10),
      imagen: '',
      rubro: selectedRubros,
      categoria: selectedCategorias,
      stock: stock,
      nro_stock:  parseInt(data.get('numeroStock'), 10),
    }
    async function creacionProducto(newProducto) {
      try {
        const Producto = await crearProducto(newProducto);
        console.log(Producto)
      } catch (error) {
        console.error("Error al crear producto:", error);
      }
    }
    creacionProducto(newData);
    console.log(newData);
    closeModal();
  };


  useEffect(() => {
    async function fetchProductos() {
      try {
        const Productos = await obtenerProductosEmpresa(1849171299);
        setListaProductos(Productos)
      } catch (error) {
        console.error("Error al obtener rubros:", error);
      }
    }
    fetchProductos();
  }, []);

  useEffect(() => {
    async function fetchCategorias(selectedRubros) {
      try {
        const categorias = await obtenerCategoriasRubro(selectedRubros);
        console.log (selectedRubros)
        setListaCategorias(categorias);
        console.log(categorias)
      } catch (error) {
        console.error("Error al obtener tegorias:", error);
      }
    }
    fetchCategorias(selectedRubros);
  }, [selectedRubros]);

  useEffect(() => {
    async function fetchRubros() {
      try {
        const rubros = await obtenerRubros();
        setListaRubros(rubros);
      } catch (error) {
        console.error("Error al obtener rubros:", error);
      }
    }
    fetchRubros();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }


  
  return (
    <Box sx={{ marginY: 4 }}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box
          sx={{
            backgroundColor: "#1976D2",
            padding: 2,
            margin: 2,
            borderRadius: 2,
            marginTop: 3
          }}
        >
          <Box sx={{ marginBottom: 1 }}>
            <Button variant="text">
              <Typography
                variant="inherit"
                style={{
                  color: "#FFFFFF",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 400,
                  textTransform: "none",
                }}
              >
                Mis Datos
              </Typography>
            </Button>
          </Box>
          <Box>
            <Button variant="text">
              <Typography
                variant="inherit"
                style={{
                  color: "#FFFFFF",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 400,
                  textTransform: "none",
                }}
              >
                Mis Productos
              </Typography>
            </Button>
          </Box>
        </Box>
        </Grid>
        <Grid item xs={8} sx={{marginY: 4}}>
        <Typography component="h1" variant="h5" sx={{marginBottom:2, marginLeft: 2}}>
            Mis Productos
        </Typography>
        <IconButton aria-label="delete" onClick={openModal}>
          <AddIcon />
        </IconButton>
        <Modal open={isModalOpen} onClose={closeModal} >
          <Box 
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 6,
              height: "80%", 
              width: "30%",
              overflow:'scroll',
            }}
            component="form"  
            onSubmit={handleSubmit}
          >
            <Typography component="h1" variant="h5" sx={{marginBottom:2}}>
                Datos de Producto
            </Typography>
              <TextField fullWidth id="marca" name="marca" label="Marca" variant="outlined" onChange={(text) => setMarca(text)}/>
              <TextField fullWidth id="titulo" name="titulo" label="Titulo" variant="outlined" sx={{marginTop: 2}} />
              <TextField fullWidth id="descripcion" name="descripcion"  label="Descripcion" variant="outlined" sx={{marginTop: 2}} />
              <TextField fullWidth id="precio" name="precio" label="Precio" variant="outlined" sx={{marginTop: 2}} />
              
              <FormControl fullWidth sx={{marginTop: 2}}>
                <InputLabel id="rubro-label">Rubro</InputLabel>
                <Select
                  labelId="rubro-label"
                  id="rubro-select"
                  value={selectedRubros}
                  onChange={handleChangeRubro}
                >
                {listaRubros.map((rubro, index) => (
                    <MenuItem key={index} value={rubro}>
                        {rubro}
                    </MenuItem>
                ))}
                </Select>
              </FormControl>
              {listaCategorias && (
              <FormControl fullWidth sx={{marginTop: 2}}>
                <InputLabel id="rubro-label">Categoria</InputLabel>
                <Select
                  labelId="rubro-label"
                  id="rubro-select"
                  value={selectedCategorias}
                  onChange={handleChangeCategoria}
                >
                {listaCategorias.map((categoria, index) => (
                    <MenuItem key={index} value={categoria}>
                        {categoria}
                    </MenuItem>
                ))}
                </Select>
              </FormControl>
              )}
              <FormControl fullWidth sx={{marginTop: 2}}>
                <InputLabel id="color-secondary-label">Stock Permanente</InputLabel>
                <Select
                  labelId="color-secondary-label"
                  id="color-secondary-select"
                  value={stock}
                  onChange={handleChange}
                >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
              <TextField fullWidth id="numeroStock" name="numeroStock" label="Stock" variant="outlined" sx={{marginTop: 2}} />
            <label htmlFor="icon-button-file" > 
                <Input accept="image/*" id="icon-button-file" type="file" sx={{marginTop: 2}}/>
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCameraIcon />
                </IconButton>
              </label>
              <Button variant="contained" sx={{ marginTop: 2 }} type="submit">
                Guardar
              </Button>
          </Box>
        </Modal>
        <Box sx={{ margin: 2, borderRadius: 2}}>
            <MyProducts rows={listaProductos}></MyProducts>  
        </Box>
      </Grid>
    </Grid>
  </Box>
  );
}
