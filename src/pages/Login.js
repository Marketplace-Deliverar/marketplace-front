import React, { useState } from "react";

// Styling and icons
import styled from "@emotion/styled";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Components
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";

const StyledContainer = styled(`div`)({
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});

const StyledSignInUpContainer = styled(`div`)({
  width: "30rem",
  gap: "1rem",
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Extra functionallity
  const isValidEmail = (email) => {
    const errors = {},
      isValidEmail =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.value === "") {
      errors.email =
        email.required || "Por favor ingresa tu correo electrónico";
    } else if (!isValidEmail.test(email.value)) {
      errors.email = email.validEmail || "Ingresa un correo electrónico válido";
    }
    return errors;
  };

  // Handlers
  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  // Renders
  const renderSignIn = () => {
    return (
      <StyledSignInUpContainer
        component="form"
        onSubmit={handleLogin}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5" component="h1">
          Ingresar a Deliver.ar
        </Typography>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="email">Correo electronico</InputLabel>
          <Input id="email" type="text" aria-describedby="email-helper-text" />
          <FormHelperText id="email-helper-text">
            Ingresar el correo con el que se encuentra registrado en el sistema
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="password">Clave</InputLabel>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button type="submit" fullWidth variant="contained" my={3}>
          Ingresar
        </Button>
        {/* TODO: Ver si vamos a tener funcionalidad de recupero de contrasena
          <Button variant="text" mt={3} mb={2}>
          Olvidaste tu contrasena?
          </Button>*/}
        <Button variant="text" onClick={() => setIsSignIn(false)} my={3}>
          Registrarme
        </Button>
      </StyledSignInUpContainer>
    );
  };

  const renderSignUpStepper = () => {
    const steps = [
      "Tipo de cuenta",
      "Detalles de cuenta",
      "Confirmacion del registro",
    ];

    return (
      <StyledSignInUpContainer>
        <Typography variant="h5">Registrarme en Deliver.ar</Typography>

        <Button variant="text" onClick={() => setIsSignIn(true)} mt={3} mb={2}>
          Ingresar
        </Button>
      </StyledSignInUpContainer>
    );
  };

  return (
    <StyledContainer>
      {isSignIn ? renderSignIn() : renderSignUpStepper()}
    </StyledContainer>
  );
};

export default Login;
