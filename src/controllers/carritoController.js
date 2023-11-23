import urlWebServices from "./webserviceController";

export const enviarCarrito = async function (carrito) {
  const url = urlWebServices.enviarCarrito;
  console.log("carrito back", carrito);
  try {
    let response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        Origin: "http://marketplace-back.deliver.ar/",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carrito),
    });

    let rdo = response.status;
    let data = await response.json();
    console.log("response:", data);

    switch (rdo) {
      case 200: {
        return { rdo: 0, mensaje: "Ok" };
      }
      case 400: {
        return { rdo: 1, mensaje: data.message };
      }
      default: {
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.error("Error", error);
  }
};
