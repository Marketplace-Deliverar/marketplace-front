import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { obtenerDatosUsuario, editarDatosUsuario } from '../controllers/usuariosController';

export default function DatosUsuario({ userId }) {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    dni: '',
    celular: '',
    direccion: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const usuario = await obtenerDatosUsuario(userId);
        setUserData(usuario);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    }
    fetchData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
    console.log(userData)
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("handleSave llamado");

    try {
      const updatedUserData = {
        "nombre": userData.nombre,
        "apellido": userData.apellido,
        "email": userData.email,
        "dni": parseInt(userData.dni),
        "celular": userData.celular,
        "direccion": userData.direccion,
      };

      console.log("nuevos datos:", updatedUserData);


      const response = await editarDatosUsuario(userId, updatedUserData);

      console.log("Response from editarDatosUsuario:", response);

      if (response.rdo === 0) {
        const nuevoUsuario = await obtenerDatosUsuario(userId);
        setUserData(nuevoUsuario);
        console.log("datos nuevo usuario:", nuevoUsuario);
      } else {
        console.error('Error al actualizar los datos del usuario:', response.mensaje);
      }
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box
          component="form"
          borderColor="primary"
          marginTop={5}
          marginBottom={5}
          borderRadius={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px',
            '& .MuiTextField-root': { marginBottom: 3, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="nombre"
            name="nombre"
            label="Nombre"
            value={userData.nombre}
            fullWidth
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            id="apellido"
            name="apellido"
            label="Apellido"
            value={userData.apellido}
            fullWidth
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            value={userData.email}
            fullWidth
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            id="dni"
            name="dni"
            label="DNI"
            type="number"  // Campo DNI ahora es de tipo "number"
            value={userData.dni}
            fullWidth
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            id="celular"
            name="celular"
            label="Celular"
            value={userData.celular}
            fullWidth
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            id="direccion"
            name="direccion"
            label="Dirección"
            value={userData.direccion}
            fullWidth
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
