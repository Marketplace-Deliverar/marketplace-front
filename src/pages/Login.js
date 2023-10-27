import React, { useState, useEffect } from "react";

// Styling and icons
import styled from "@emotion/styled";
import * as MUIColors from "@mui/material/colors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Components
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  loginUserPassword,
  registerCompany,
  registerUser,
} from "../apis/authApis";
import { useNavigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';


const StyledContainer = styled(`div`)({
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});

const StyledSignInUpContainer = styled(`div`)(({ theme }) => ({
  paddingTop: "5rem",

  gap: "1rem",
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",

  [theme.breakpoints.down("md")]: {
    width: "80vw",
  },
  [theme.breakpoints.up("md")]: {
    width: "30vw",
  },
}));

const StyledLogo = styled(`div`)(({ theme }) => ({
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "1rem",
  margin: "2rem",
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: "4rem",
  height: "4rem",
  borderRadius: "50%",
}));

const StyledActionButtonStteper = styled(Box)(({ theme }) => ({
  display: "flex",
  textAlign: "center",
  gap: 4,
}));

const StyledDot = styled(`div`)(({ dotColor, theme }) => ({
  height: "1rem",
  width: "1rem",
  borderRadius: "50%",
  marginRight: "1rem",
  background: dotColor,
}));

const StyledNamespaceFormControl = styled(FormControl)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "space-around",
}));

const Login = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const user = useUser();
  const user_id = user ? user.user.id : 'Usuario no autenticado';

  // SignUp only
  const [activeStep, setActiveStep] = useState(0);
  const [nameInput, setNameInput] = useState("");
  const [surnameInput, setSurnameInput] = useState("");
  const [dniInput, setDniInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formInputError, setFormInputError] = useState(false);

  const [legalNameInput, setLegalNameInput] = useState("");
  const [cuilInput, setCuilInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [namespaceInput, setNamespaceInput] = useState("");
  const [customPaletteInput, setCustomPaletteInput] = useState(false);
  const [customPalettePrimaryColorInput, setCustomPalettePrimaryColorInput] =
    useState("blue");
  const [
    customPaletteSecondaryColorInput,
    setCustomPaletteSecondaryColorInput,
  ] = useState("pink");
  const [signUpUserInformation, setSignUpUserInformation] = useState({});

  // Extra functionallity
  const isValidEmail = (email) => {
    const isValidEmailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!isValidEmailRegex.test(email)) {
      return false;
    }
    return true;
  };

  const obtenerDatosUsuario = async (tipo_usuario, user_id) => {
    try {
      const response = await fetch(`https://xorn7asoxb4eecmwmszz5fbc3a0wamui.lambda-url.us-east-1.on.aws/${tipo_usuario}/${user_id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Hubo un problema con la solicitud fetch:', error);
      throw error;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datosUsuario = await obtenerDatosUsuario("usuarios", user_id);
        const datosEmpresa = await obtenerDatosUsuario("empresas", user_id);

        console.log(datosUsuario);
        console.log(datosEmpresa);

        if (!('error' in datosUsuario)) {
          console.log('Usuario');
          // window.location.href = 'https://' + window.location.hostname;
          window.location.href = 'http://hola.localhost:3000';
          localStorage.setItem('userType', 'individuo')
        }

        if (!('error' in datosEmpresa)) {
          console.log('Empresa');
          // window.location.href = 'https://' + window.location.hostname;
          window.location.href = 'http://hola.localhost:3000';
          localStorage.setItem('userType', 'empresa')
        }
      } catch (error) {
        // Manejar el error, si es necesario
      }
    };

    fetchData();
  }, [user_id]);

  const resetValues = () => {
    setActiveStep(0);
    setCustomPaletteInput(false);
    setFormInputError(false);
    setPasswordInput("");
    setShowPassword(false);
  };

  // Handlers
  const handleSubmit = async (event) => {
    let data = {};
    event.preventDefault();
    if (isSignIn) {
      // Ingresar con usuario y contrasena
      console.log({
        email: emailInput,
        password: passwordInput,
      });
      await loginUserPassword(emailInput, passwordInput)
        .then(() => { })
        .catch((error) => console.error(error));
    } else {
      if (signUpUserInformation.type === "persona") {
        data = {
          ...signUpUserInformation,
          uId: user_id,
          name: nameInput,
          surname: surnameInput,
          dni: dniInput,
          phone: phoneInput,
          address: addressInput,
          email: emailInput,
          password: passwordInput,
        };
        // Registro persona
        setSignUpUserInformation(data);
        await registerUser(data).catch((error) => console.error(error));
      } else {
        data = {
          ...signUpUserInformation,
          uId: user_id,
          name: nameInput,
          legalName: legalNameInput,
          cuil: cuilInput,
          url: namespaceInput + ".marketplace.deliver.ar",
          address: addressInput,
          category: categoryInput,
          email: emailInput,
          phone: phoneInput,
          password: passwordInput,
          customPalette: customPaletteInput,
          primaryColor: customPalettePrimaryColorInput,
          secondaryColor: customPaletteSecondaryColorInput,
        };
        // Registro empresa
        setSignUpUserInformation(data);
        await registerCompany(data).catch((error) => console.error(error));
      }
      setShowPassword(false);
      setIsSignIn(true);
    }

    console.log(signUpUserInformation.type)

    // if (signUpUserInformation.type !== "persona") {
    //   navigate("/BusinessProducts");
    // }
    navigate("/", {
      // TODO: Props are not being recognized
      state: { userIsAuthenticated: true },
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Renders
  const renderSignIn = () => {
    return (
      <StyledSignInUpContainer
        id="signInForm"
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <StyledLogo>
          <Typography variant="caption" component="h1">
            Deliver.ar
          </Typography>
        </StyledLogo>
        <FormControl variant="standard" fullWidth required>
          <InputLabel htmlFor="email">Correo electronico</InputLabel>
          <Input
            id="email"
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            aria-describedby="email-helper-text"
          />
          <FormHelperText id="email-helper-text">
            Ingresar el correo con el que se encuentra registrado en el sistema
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard" fullWidth required>
          <InputLabel htmlFor="password">Clave</InputLabel>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
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

        <Button
          type="submit"
          form="signInForm"
          variant="contained"
          onClick={(e) => handleSubmit(e, "signIn")}
          fullWidth
          my={3}
        >
          Ingresar
        </Button>
        {/* TODO: Ver si vamos a tener funcionalidad de recupero de contrasena
          <Button variant="text" mt={3} mb={2}>
          Olvidaste tu contrasena?
          </Button>*/}

        <Button
          variant="text"
          onClick={() => {
            resetValues();
            setIsSignIn(false);
          }}
          my={3}
        >
          Registrarme
        </Button>
      </StyledSignInUpContainer>
    );
  };

  const renderSignUpFormAccountTypeStep = () => {
    return (
      <Box display="flex" flexDirection="column" gap={4}>
        <Button
          onClick={() => {
            setSignUpUserInformation({ type: "persona" });
            handleNext();
          }}
          variant="outlined"
        >
          REGISTRAME COMO PERSONA
        </Button>
        <Button
          onClick={() => {
            setSignUpUserInformation({ type: "empresa" });
            handleNext();
          }}
          variant="outlined"
        >
          REGISTRARME COMO EMPRESA
        </Button>
      </Box>
    );
  };

  const renderSignUpFormAccountDetailsStep = () => {
    const colors = [
      "red",
      "pink",
      "purple",
      "deepPurple",
      "indigo",
      "blue",
      "lightBlue",
      "cyan",
      "teal",
      "green",
      "lightGreen",
      "lime",
      "yellow",
      "amber",
      "orange",
      "deepOrange",
      "brown",
      "grey",
      "blueGrey",
    ].map((item, index) => {
      return { value: index, label: item };
    });
    if (signUpUserInformation.type === "persona") {
      // Persona
      return (
        <Box
          id="signUpForm"
          component="form"
          display="flex"
          flexDirection="column"
          width="100%"
          autoComplete="off"
          marginBottom={4}
          gap={2}
        >
          <FormControl variant="standard" fullWidth required>
            <InputLabel htmlFor="name">Nombre</InputLabel>
            <Input
              id="name"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth required>
            <InputLabel htmlFor="surname">Apellido</InputLabel>
            <Input
              id="surname"
              type="text"
              value={surnameInput}
              onChange={(e) => setSurnameInput(e.target.value)}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth required>
            <InputLabel htmlFor="dni">DNI</InputLabel>
            <Input
              id="dni"
              type="text"
              value={dniInput}
              onChange={(e) => setDniInput(e.target.value)}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth required>
            <InputLabel htmlFor="phone">Telefono</InputLabel>
            <Input
              id="phone"
              type="text"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth required>
            <InputLabel htmlFor="address">Direccion</InputLabel>
            <Input
              id="address"
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth required>
            <InputLabel htmlFor="email">Correo electronico</InputLabel>
            <Input
              id="email"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </FormControl>
        </Box>
      );
    }

    // Empresa
    return (
      <Box
        id="signUpForm"
        component="form"
        display="flex"
        flexDirection="column"
        width="100%"
        autoComplete="off"
        marginBottom={4}
        gap={2}
      >
        <FormControl variant="standard" fullWidth required>
          <InputLabel htmlFor="name">Nombre</InputLabel>
          <Input
            id="name"
            name="name"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" fullWidth required>
          <InputLabel htmlFor="legalName">Razon social</InputLabel>
          <Input
            id="legalName"
            name="legalName"
            type="text"
            value={legalNameInput}
            onChange={(e) => setLegalNameInput(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" fullWidth required>
          <InputLabel htmlFor="cuil">CUIL</InputLabel>
          <Input
            id="cuil"
            name="cuil"
            type="text"
            value={cuilInput}
            onChange={(e) => setCuilInput(e.target.value)}
          />
        </FormControl>
        <StyledNamespaceFormControl variant="standard" required>
          <InputLabel htmlFor="namespace">Dominio</InputLabel>
          <Input
            id="namespace"
            name="namespace"
            type="text"
            value={namespaceInput}
            fullWidth
            onChange={(e) => setNamespaceInput(e.target.value)}
          />
          .marketplace.deliver.ar
        </StyledNamespaceFormControl>
        <FormControl variant="standard" fullWidth required>
          <InputLabel htmlFor="address">Direccion</InputLabel>
          <Input
            id="address"
            type="text"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" fullWidth required>
          <InputLabel htmlFor="phone">Telefono</InputLabel>
          <Input
            id="phone"
            type="text"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" fullWidth required>
          <InputLabel htmlFor="category">Rubro</InputLabel>
          <Input
            id="category"
            type="text"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" fullWidth required>
          <InputLabel htmlFor="email">Correo electronico</InputLabel>
          <Input
            id="email"
            name="email"
            type="text"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </FormControl>
        <FormGroup variant="standard" fullWidth>
          <FormControlLabel
            control={
              <Switch
                id="customPalette"
                name="customPalette"
                value={customPaletteInput}
                onChange={() => setCustomPaletteInput(!customPaletteInput)}
              />
            }
            label="Definir paleta de colores"
          />
        </FormGroup>
        {customPaletteInput && (
          <>
            <FormControl variant="standard" fullWidth>
              <TextField
                id="primaryColor"
                name="customPalettePrimaryColor"
                select
                label="Color primario"
                value={customPalettePrimaryColorInput}
                onChange={(e) =>
                  setCustomPalettePrimaryColorInput(e.target.value)
                }
                fullWidth
              >
                {colors.map((option) => {
                  return (
                    <MenuItem
                      key={option.value}
                      value={option.label}
                      renderValue={(value) => {
                        return value;
                      }}
                    >
                      <>
                        {option.label && (
                          <StyledDot dotColor={MUIColors[option.label][500]} />
                        )}
                        {option.label}
                      </>
                    </MenuItem>
                  );
                })}
              </TextField>
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <TextField
                id="secondaryColor"
                name="customPaletteSecondaryColor"
                select
                label="Color secundario"
                value={customPaletteSecondaryColorInput}
                onChange={(e) =>
                  setCustomPaletteSecondaryColorInput(e.target.value)
                }
                fullWidth
              >
                {colors.map((option) => {
                  return (
                    <MenuItem
                      key={option.value}
                      value={option.label}
                      renderValue={(value) => {
                        return value;
                      }}
                    >
                      <>
                        {option.label && (
                          <StyledDot dotColor={MUIColors[option.label][500]} />
                        )}
                        {option.label}
                      </>
                    </MenuItem>
                  );
                })}
              </TextField>
            </FormControl>
          </>
        )}
      </Box>
    );
  };

  const renderSignUpFormLastStep = () => {
    return (
      <Typography variant="subtitle1" my={2}>
        Registro realizado con exito!
      </Typography>
    );
  };

  const renderSignUpStepper = () => {
    return (
      <StyledSignInUpContainer>
        <StyledLogo>
          <Typography variant="caption" component="h1">
            Deliver.ar
          </Typography>
        </StyledLogo>

        {activeStep === 2 ? (
          renderSignUpFormLastStep()
        ) : (
          <>
            {activeStep === 0
              ? renderSignUpFormAccountTypeStep()
              : renderSignUpFormAccountDetailsStep()}
            <StyledActionButtonStteper>
              {activeStep !== 0 && (
                <>
                  <Button
                    onClick={() => {
                      handleBack();
                      resetValues();
                    }}
                    sx={{ mr: 1 }}
                  >
                    VOLVER
                  </Button>
                  <Button
                    type="submit"
                    form="signUpForm"
                    onClick={(e) => handleSubmit(e, "signUp")}
                    variant="contained"
                  >
                    REGISTRARME
                  </Button>
                </>
              )}
            </StyledActionButtonStteper>
          </>
        )}
        <Button
          variant="text"
          onClick={() => {
            resetValues();
            setIsSignIn(true);
          }}
          mt={3}
        >
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
