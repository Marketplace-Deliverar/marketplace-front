import urlWebServices from "./webserviceController";
let backendURL = "http://ec2-52-7-119-146.compute-1.amazonaws.com";

export const obtenerEmpresa = async function (id) {
  let url = urlWebServices.obtenerEmpresas + `/${id}`;
  try {
    let response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Origin: backendURL,
      },
    });
    if (response.status === 200) {
      let data = await response.json();
      let datosEmpresa = data;
      console.log(data);
      return datosEmpresa;
    } else {
      console.error(
        "Error al obtener empresas. Código de estado:",
        response.status
      );
      return [];
    }
  } catch (error) {
    throw new Error(`Error al obtener empresas: ${error}`);
  }
};

export const actualizarEmpresa = async function (id, empresaData) {
  let url = urlWebServices.obtenerEmpresas + `/${id}`;
  try {
    let response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Origin: backendURL,
      },
      body: JSON.stringify(empresaData),
    });

    if (response.status === 200) {
      let data = await response.json();
      let datosEmpresa = data;
      console.log(data);
      return datosEmpresa;
    } else {
      console.error(
        "Error al actualizar empresa. Código de estado:",
        response.status
      );
      return null;
    }
  } catch (error) {
    throw new Error(`Error al actualizar empresa: ${error}`);
  }
};
