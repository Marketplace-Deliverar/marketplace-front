import urlWebServices from "./webserviceController";
let backendURL = "http://ec2-52-7-119-146.compute-1.amazonaws.com";

export const obtenerPedidosUsuario = async function (uId) {
  let url = urlWebServices.obtenerPedidosUsuario + `${uId}`;
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
      let listaPedidos = data;
      console.log(data);
      return listaPedidos;
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
