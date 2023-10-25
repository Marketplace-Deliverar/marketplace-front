import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MyButton from './MyButton';


export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      border={1}
      marginBottom={2}
      marginLeft={60}
      marginRight={60}
      borderRadius={3}
      align="center"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '35ch' },
      }}
      noValidate
      autoComplete="off"
    >

        <div>
          <TextField
            required
            id="outlined-required"
            label="Nombre"
            defaultValue=""
          />
          <TextField
            required
            id="outlined-disabled"
            label="Apellido"
            defaultValue=""
          />
        </div>

        <div>
          <TextField
            required
            id="outlined-password-input"
            label="Email"
            autoComplete="current-password"
          />
          <TextField
            required
            id="outlined-number"
            label="DNI"
            type="number"
          />
        </div>

      <div>
        <TextField
          required
          id="outlined-password-input"
          label="Email"
          autoComplete="current-password"
        />
        <TextField
          required
          id="outlined-number"
          label="Teléfono"
          type="number"
        />
      </div>
      
      <div>
        <TextField
          required
          id="outlined-password-input"
          label="Ciudad"
          autoComplete="current-password"
        />
        <TextField
          required
          id="outlined-number"
          label="Localidad"
          type="number"
        />
      </div>

      <div>
        <TextField
          required
          id="outlined-password-input"
          label="Direccion"
          autoComplete="current-password"
        />
        <TextField
          required
          id="outlined-number"
          label="Altura"
          type="number"
        />
      </div>

      <div>
        <TextField
          id="outlined-password-input"
          label="Piso"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-number"
          label="Depto"
          type="number"
        />
      </div>
      <MyButton label="Guardar" color="primary" disabled="false"/>
      
    </Box>
  );
}
