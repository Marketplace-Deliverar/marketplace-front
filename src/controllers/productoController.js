import urlWebServices from "./webserviceController";
let backendURL = "https://marketplace-back.deliver.ar/";

export const obtenerProductosEmpresa = async function (id) {
  let url = urlWebServices.obtenerProductosEmpresa + `${id}`;
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
      let Productos = data;
      console.log(data);
      return Productos;
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

export const obtenerCategoriasRubro = async function (Rubro) {
  let url = urlWebServices.obtenerCategoriasPorRubro + Rubro + "/categoria";
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
      let Categorias = data;
      console.log(data);
      return Categorias;
    } else {
      console.error(
        "Error al obtener categorias. Código de estado:",
        response.status
      );
      return [];
    }
  } catch (error) {
    throw new Error(`Error al obtener categorias: ${error}`);
  }
};

export const crearProducto = async function (ProductoData) {
  let url = urlWebServices.Productos;
  try {
    let response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Origin: backendURL,
      },
      body: JSON.stringify(ProductoData),
    });
    console.log(response);
    console.log(JSON.stringify(ProductoData));

    if (response.status === 201) {
      let data = await response.json();
      let datosProducto = data;
      console.log(data);
      return datosProducto;
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
