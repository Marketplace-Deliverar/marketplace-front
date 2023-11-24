const urlApi = "https://marketplace-back.deliver.ar/";
console.log("url", urlApi);

const urlWebServices = {
  //marcas o empresas
  obtenerEmpresas: urlApi + "empresas",
  obtenerRubros: urlApi + "productos/rubro",
  obtenerCategoriasPorRubro: urlApi + "productos/rubro/",
  obtenerProductosEmpresa: urlApi + "productos/empresa/",

  //usuarios
  obtenerDatosUsuario: urlApi + "usuarios/",
  editarDatosUsuario: urlApi + "usuarios/",

  //pedidos
  obtenerPedidosUsuario: urlApi + "purchase/estado/",

  //productos
  Productos: urlApi + "productos",

  //carrito
  enviarCarrito: urlApi + "purchase",

  //podio
  podio: urlApi + "podio"
};

export default urlWebServices;
