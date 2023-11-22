const urlApi = "http://ec2-52-7-119-146.compute-1.amazonaws.com/";
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
  obtenerPedidosUsuario: urlApi + "pedidos/usuario/",

  //productos
  Productos: urlApi + "productos",
};

export default urlWebServices;
