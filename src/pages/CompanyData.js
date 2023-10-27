import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Modal from "@mui/material/Modal";
import {obtenerEmpresa, actualizarEmpresa } from "../controllers/empresasController";
import {obtenerRubros} from "../controllers/marcasController"

const CompanyData = () => {
    const [age, setAge] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [datosEmpresa, setDatosEmpresa] = useState();
    const [listaRubros, setListaRubros] = useState([]);
    const [selectedRubros, setSelectRubros] = useState("");
    const [razonSocial, setRazonSocial] = useState(""); 
    const [cuit, setCuit] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [telefonoCelular, setTelefonoCelular] = useState(""); 
    const [direccion, setDireccion] = useState(""); 


    const handleChangeRubro = (event) => {
        setSelectRubros(event.target.value); 
    };

    const handleSubmit = async () => {
        const updatedData = {
            razon_social: razonSocial,
            cuit: cuit,
            email: email,
            celular: telefonoCelular,
            direccion: direccion,
            rubro: selectedRubros,
            color_primario: "#FF5733",
            color_secundario: "#3399FF",
        };
        console.log(updatedData)
        console.log(JSON.stringify(updatedData))
        try {
            const rubros = await actualizarEmpresa(186,updatedData);
            setListaRubros(rubros);
          } catch (error) {
            console.error("Error al obtener rubros:", error);
        }

        closeModal();
    };


    useEffect(() => {
        async function fetchData() {
          try {
            const empresa = await obtenerEmpresa(186);
            setDatosEmpresa(empresa);
            setSelectRubros(empresa.rubro);
            setRazonSocial(empresa.razon_social);
            setCuit(empresa.cuit);
            setEmail(empresa.email);
            setTelefonoCelular(empresa.celular);
            setDireccion(empresa.direccion);
          } catch (error) {
            console.error("Error al obtener empresas:", error);
          }
        }
        fetchData();
      }, []);

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

      
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
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
                Datos de Empresa
            </Typography>
            {datosEmpresa && (
            <Box
              sx={{
                backgroundColor: "#f2f2f2",
                padding: 2,
                margin: 2,
                borderRadius: 2,
              }}
            >
            
            <Typography component="h1" variant="h6" sx={{marginBottom:2, marginLeft: 2}}>
                CUIT
            </Typography>
            <Typography  variant="subtitle1" sx={{marginBottom:2, marginLeft: 2}}>
                {datosEmpresa.cuit}
            </Typography>
            <Typography component="h1" variant="h6" sx={{marginBottom:2, marginLeft: 2}}>
                Razon Social
            </Typography>
            <Typography  variant="subtitle1" sx={{marginBottom:2, marginLeft: 2}}>
                {datosEmpresa.razon_social}
            </Typography>
            <Typography component="h1" variant="h6" sx={{marginBottom:2, marginLeft: 2}}>
                Rubro
            </Typography>
            <Typography  variant="subtitle1" sx={{marginBottom:2, marginLeft: 2}}>
                {datosEmpresa.rubro}
            </Typography>
            <Typography component="h1" variant="h6" sx={{marginBottom:2, marginLeft: 2}}>
                Email
            </Typography>
            <Typography  variant="subtitle1" sx={{marginBottom:2, marginLeft: 2}}>
                {datosEmpresa.email}
            </Typography>
            <Typography component="h1" variant="h6" sx={{marginBottom:2, marginLeft: 2}}>
                Direccion
            </Typography>
            <Typography  variant="subtitle1" sx={{marginBottom:2, marginLeft: 2}}>
                {datosEmpresa.direccion}
            </Typography>
            <Typography component="h1" variant="h6" sx={{marginBottom:2, marginLeft: 2}}>
                Teléfono Celular
            </Typography>
            <Typography  variant="subtitle1" sx={{marginBottom:2, marginLeft: 2}}>
                {datosEmpresa.celular}
            </Typography>
            <Typography component="h1" variant="h6" sx={{marginBottom:2, marginLeft: 2}}>
                Color Primario
            </Typography>
            <Typography  variant="subtitle1" sx={{marginBottom:2, marginLeft: 2}}>
                {datosEmpresa.color_primario}
            </Typography>
            <Typography component="h1" variant="h6" sx={{marginBottom:2, marginLeft: 2}}>
                Color Primario
            </Typography>
            <Typography  variant="subtitle1" sx={{marginBottom:2, marginLeft: 2}}>
                {datosEmpresa.color_secundario}
            </Typography>
            
            <Button variant="contained" onClick={openModal} >
                Editar Datos
            </Button>
             
            </Box>
            )}
          </Grid>
        </Grid>
  
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
          >
            <Typography component="h1" variant="h5" sx={{marginBottom:2}}>
                Edite los datos de su empresa
            </Typography>
            {datosEmpresa && (
            <form>
              <TextField fullWidth id="outlined-basic-1" label="Razón Social" variant="outlined" defaultValue={datosEmpresa.razon_social}/>
              <TextField fullWidth id="outlined-basic-2" label="CUIT" variant="outlined" sx={{marginTop: 2}} defaultValue={datosEmpresa.cuit}/>
              <TextField fullWidth id="outlined-basic-3" label="Email" variant="outlined" sx={{marginTop: 2}} defaultValue={datosEmpresa.email}/>
              <TextField fullWidth id="outlined-basic-4" label="Teléfono Celular" variant="outlined" sx={{marginTop: 2}} defaultValue={datosEmpresa.celular}/>
              <TextField fullWidth id="outlined-basic-5" label="Dirección" variant="outlined" sx={{marginTop: 2}} defaultValue={datosEmpresa.direccion}/>
              <FormControl fullWidth sx={{marginTop: 2}}>
                <InputLabel id="color-primary-label">Color Primario</InputLabel>
                <Select
                  labelId="color-primary-label"
                  id="color-primary-select"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Color1</MenuItem>
                  <MenuItem value={20}>Color2</MenuItem>
                  <MenuItem value={30}>Color3</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{marginTop: 2}}>
                <InputLabel id="color-secondary-label">Color Secundario</InputLabel>
                <Select
                  labelId="color-secondary-label"
                  id="color-secondary-select"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Color1</MenuItem>
                  <MenuItem value={20}>Color2</MenuItem>
                  <MenuItem value={30}>Color3</MenuItem>
                </Select>
              </FormControl>
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
              <label htmlFor="icon-button-file" > 
                <Input accept="image/*" id="icon-button-file" type="file" sx={{marginTop: 2}}/>
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCameraIcon />
                </IconButton>
              </label>
              <Button variant="contained" sx={{ marginTop: 2 }} onClick={closeModal}>
                Guardar
              </Button>
            </form>
            )}
          </Box>
        </Modal>
      </Box>
    );
  };
  
export default CompanyData;