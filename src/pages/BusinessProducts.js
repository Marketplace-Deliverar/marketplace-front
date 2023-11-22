import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles & icons
import { useTheme } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

// Apis
import {
  obtenerProductosEmpresa,
  obtenerCategoriasRubro,
  crearProducto,
} from "../controllers/productoController";
import { obtenerRubros } from "../controllers/marcasController";
import { getbrandByURL } from "../apis/brandApis";

// Custom componets & context
import MyProducts from "../components/MyProducts";
import { useAuth } from "../context/AuthenticationContextProvider";

// External Components
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const BusinessProducts = () => {
  const theme = useTheme();
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [listaProductos, setListaProductos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRubros, setSelectRubros] = useState("");
  const [listaRubros, setListaRubros] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [selectedCategorias, setSelectCategorias] = useState("");
  const [stock, setStock] = useState("");
  const [marca, setMarca] = useState("");
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Productos
      try {
        let response = await getbrandByURL(user.domain);
        if (response) {
          const productos = await obtenerProductosEmpresa(response.uId);
          if (productos) setListaProductos(productos);
        }
      } catch (error) {
        console.error("Error al obtener empresa y/o productos:", error);
      }

      // Rubros
      try {
        const rubros = await obtenerRubros();
        setListaRubros(rubros);
      } catch (error) {
        console.error("Error al obtener rubros:", error);
      }
      setLoading(false);
    };

    if (!isAuthenticated) navigate("/");
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCategorias(selectedRubros) {
      try {
        const categorias = await obtenerCategoriasRubro(selectedRubros);
        console.log(selectedRubros);
        setListaCategorias(categorias);
        console.log(categorias);
      } catch (error) {
        console.error("Error al obtener categorias:", error);
      }
    }
    fetchCategorias(selectedRubros);
  }, [selectedRubros]);

  // Cloudinary Upload
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    uploadFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  // TODO: Lo iban a cambiar o queda asi?
  function uploadFile(file) {
    const url = `https://api.cloudinary.com/v1_1/daykon/upload`;
    const fd = new FormData();
    fd.append("upload_preset", "jmtb9sl5");
    fd.append("tags", "integracion_aplicaciones");
    fd.append("file", file);

    fetch(url, {
      method: "POST",
      body: fd,
    })
      .then((response) => response.json())
      .then((data) => {
        const url = data.secure_url;
        setFileUrl(url);
      })
      .catch((error) => {
        console.error("Error uploading the file:", error);
      });
  }

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
    console.log(data);
    const newData = {
      id_empresa: "1849171299",
      titulo: data.get("titulo"),
      marca: data.get("marca"),
      description: data.get("descripcion"),
      precio: parseInt(data.get("precio"), 10),
      imagen: fileUrl,
      rubro: selectedRubros,
      categoria: selectedCategorias,
      stock: stock,
      nro_stock: parseInt(data.get("numeroStock"), 10),
    };

    async function creacionProducto(newProducto) {
      try {
        const Producto = await crearProducto(newProducto);
        console.log(Producto);
      } catch (error) {
        console.error("Error al crear producto:", error);
      }
    }
    creacionProducto(newData);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Renders
  const renderTabsMenu = () => {
    return (
      <Grid item xs={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            backgroundColor: theme.palette.primary.main,
            borderRadius: 2,
            p: 2,
            m: 4,
          }}
        >
          <Button
            variant="text"
            onClick={() => {
              navigate("/empresa");
            }}
          >
            <Typography variant="subtitle2" color={"primary.contrastText"}>
              Mis Datos
            </Typography>
          </Button>
          <Button variant="text">
            <Typography variant="subtitle2" color={"primary.contrastText"}>
              Mis Productos
            </Typography>
          </Button>
        </Box>
      </Grid>
    );
  };

  const renderProductsData = () => {
    return (
      <Grid item xs={8} sx={{ marginY: 4 }}>
        <Typography
          component="h1"
          variant="h5"
          sx={{ marginBottom: 2, marginLeft: 2 }}
        >
          Mis Productos
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <IconButton
              aria-label="delete"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <AddIcon />
            </IconButton>
            <Box sx={{ margin: 2, borderRadius: 2 }}>
              <MyProducts rows={listaProductos}></MyProducts>
            </Box>
          </>
        )}
      </Grid>
    );
  };

  const renderAddProductDataModal = () => {
    return (
      <Modal open={isModalOpen} onClose={closeModal}>
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
            overflow: "scroll",
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
            Datos de Producto
          </Typography>
          <TextField
            fullWidth
            id="marca"
            name="marca"
            label="Marca"
            variant="outlined"
            onChange={(text) => setMarca(text)}
          />
          <TextField
            fullWidth
            id="titulo"
            name="titulo"
            label="Titulo"
            variant="outlined"
            sx={{ marginTop: 2 }}
          />
          <TextField
            fullWidth
            id="descripcion"
            name="descripcion"
            label="Descripcion"
            variant="outlined"
            sx={{ marginTop: 2 }}
          />
          <TextField
            fullWidth
            id="precio"
            name="precio"
            label="Precio"
            variant="outlined"
            sx={{ marginTop: 2 }}
          />

          <FormControl fullWidth sx={{ marginTop: 2 }}>
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
            <FormControl fullWidth sx={{ marginTop: 2 }}>
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
          <FormControl fullWidth sx={{ marginTop: 2 }}>
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
          <TextField
            fullWidth
            id="numeroStock"
            name="numeroStock"
            label="Stock"
            variant="outlined"
            sx={{ marginTop: 2 }}
          />
          <Box sx={{ marginTop: 2 }}>
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              sx={{ marginTop: 2, display: "none" }}
              onChange={handleFileUpload}
            />
            <label htmlFor="icon-button-file">
              <Button
                variant="contained"
                component="span"
                startIcon={<PhotoCameraIcon />}
              >
                Agregar Foto
              </Button>
              <Typography>{file.name}</Typography>
            </label>
          </Box>
          <Button variant="contained" sx={{ marginTop: 2 }} type="submit">
            Guardar
          </Button>
        </Box>
      </Modal>
    );
  };

  return (
    <Box sx={{ marginY: 4 }}>
      <Grid container spacing={2}>
        {renderTabsMenu()}
        {renderProductsData()}
      </Grid>
      {renderAddProductDataModal()}
    </Box>
  );
};

export default BusinessProducts;
