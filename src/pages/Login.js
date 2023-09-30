import React, { useState } from "react";

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

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // SignUp only
  const [activeStep, setActiveStep] = useState(0);
  const [nameInput, setNameInput] = useState("");
  const [surnameInput, setSurnameInput] = useState("");
  const [dniInput, setDniInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formInputError, setFormInputError] = useState(false);

  const [legalNameInput, setLegalNameInput] = useState("");
  const [cuilInput, setCuilInput] = useState("");
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

  const resetValues = () => {
    setActiveStep(0);
    setCustomPaletteInput(false);
    setFormInputError(false);
    setPasswordInput("");
    setShowPassword(false);
  };

  // Handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignIn) {
      // Ingresar con usuario y contrasena
      console.log({
        email: emailInput,
        password: passwordInput,
      });
    } else {
      if (signUpUserInformation.type === "persona") {
        // Registro persona
        setSignUpUserInformation({
          ...signUpUserInformation,
          name: nameInput,
          surname: surnameInput,
          dni: dniInput,
          email: emailInput,
          password: passwordInput,
        });
      } else {
        // Registro empresa
        setSignUpUserInformation({
          ...signUpUserInformation,
          name: nameInput,
          legalName: legalNameInput,
          cuil: cuilInput,
          email: emailInput,
          password: passwordInput,
          customPalette: customPaletteInput,
          primaryColor: customPalettePrimaryColorInput,
          secondaryColor: customPaletteSecondaryColorInput,
        });
      }
      setShowPassword(false);
      setIsSignIn(true);
    }

    // TODO: Limpiar variables y redirigir
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
          disabled={!isValidEmail(emailInput) || passwordInput === ""}
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
            <InputLabel htmlFor="email">Correo electronico</InputLabel>
            <Input
              id="email"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
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
          <FormControl variant="standard" fullWidth required>
            <InputLabel htmlFor="confirmPassword">Confirmar clave</InputLabel>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPasswordInput}
              error={formInputError}
              onChange={(e) => {
                setConfirmPasswordInput(e.target.value);
                setFormInputError(e.target.value !== passwordInput);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              aria-describedby="confirmPassword-helper-text"
            />
            <FormHelperText
              error={formInputError}
              id="confirmPassword-helper-text"
            >
              {formInputError && "Las contrasenas deben ser identicas"}
            </FormHelperText>
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
        <FormControl variant="standard" fullWidth required>
          <InputLabel htmlFor="password">Clave</InputLabel>
          <Input
            id="password"
            name="password"
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
        <FormControl variant="standard" fullWidth required>
          <InputLabel htmlFor="confirmPassword">Confirmar clave</InputLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPasswordInput}
            error={formInputError}
            onChange={(e) => {
              setConfirmPasswordInput(e.target.value);
              setFormInputError(e.target.value !== passwordInput);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            aria-describedby="confirmPassword-helper-text"
          />
          <FormHelperText
            error={formInputError}
            id="confirmPassword-helper-text"
          >
            {formInputError && "Las contrasenas deben ser identicas"}
          </FormHelperText>
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
                    disabled={
                      formInputError ||
                      !nameInput ||
                      !legalNameInput ||
                      !cuilInput ||
                      !emailInput ||
                      !passwordInput ||
                      !confirmPasswordInput
                    }
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
