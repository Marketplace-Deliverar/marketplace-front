import axios from "axios";
const baseBackendURL =
  "https://xorn7asoxb4eecmwmszz5fbc3a0wamui.lambda-url.us-east-1.on.aws/";

export const loginUserPassword = async (user, password) => {
  return;
  /* TODO: Pending endpoint
  axios
    .get(baseBackendURL + "")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });*/
};
export const registerUser = async (userData) => {
  const { uId, name, lastName, dni, email, cellphone, address } = userData;
  axios
    .post(baseBackendURL + "usuarios", {
      uId: uId,
      nombre: name || "",
      apellido: lastName || "",
      dni: dni || 0,
      email: email || "",
      celular: cellphone || 0,
      direccion: address || "",
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};
export const registerCompany = async (companyData) => {
  const {
    uId,
    legalName,
    cuil,
    url,
    email,
    address,
    phone,
    password, //Pending
    customPalette, //Pending
    primaryColor,
    secondaryColor,
    category, // Pending
  } = companyData;
  axios
    .post(baseBackendURL + "empresas", {
      uId: uId,
      razon_social: legalName,
      cuit: cuil,
      email: email,
      celular: phone || 0,
      direccion: address || "",
      url: url,
      color_primario: primaryColor,
      color_secundario: secondaryColor,
      logo_svg: "",
      rubro: category,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};
