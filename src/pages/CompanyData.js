import React, { useEffect } from "react";
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
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

export default function CompanyData() {
    
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Box sx={{marginY:4}}>
            <Grid container spacing={2}>
            <Grid item xs={4}>
            <Box
                sx={{
                backgroundColor: "#1976D2", 
                padding: 2,
                margin:2,
                borderRadius:2,
                }}
            >
            <Box sx={{ marginBottom: 1 }}>
            <Button variant="text">
                <Typography variant="inherit" style={{color: "#FFFFFF", fontFamily: "Montserrat, sans-serif",fontWeight: 400,  textTransform: "none"}}>
                    Mis Datos
                </Typography>
            </Button>
            </Box>
            <Box>
            <Button variant="text">
                <Typography variant="inherit" style={{color: "#FFFFFF", fontFamily: "Montserrat, sans-serif",fontWeight: 400,  textTransform: "none"}}>
                    Mis Pedidos
                </Typography>
            </Button>
            </Box>
            </Box>
            </Grid>
            <Grid item xs={8} sx={{marginY: 4}}>
            <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 1, width: '80%' }, 
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic-1" label="Razón Social" variant="outlined" />
                <TextField id="outlined-basic-2" label="CUIT" variant="outlined" />
                <TextField id="outlined-basic-3" label="Email" variant="outlined" />
                <TextField id="outlined-basic-4" label="Teléfono Celular" variant="outlined" />
                <TextField id="outlined-basic-5" label="Direccion" variant="outlined" />
                <TextField id="outlined-basic-6" label="Contraseña" variant="outlined" />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Color</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                    >
                    <MenuItem value={10}>Color1</MenuItem>
                    <MenuItem value={20}>Color2</MenuItem>
                    <MenuItem value={30}>Color3</MenuItem>
                    </Select>
                </FormControl>
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCameraIcon />
                    </IconButton>
                </label>
            </Box>
            <Button variant="contained" sx={{marginY:2, marginX:1}}>Guardar</Button>
            </Grid>
        </Grid>
      </Box>
    );
}