const urlApi = "https://xorn7asoxb4eecmwmszz5fbc3a0wamui.lambda-url.us-east-1.on.aws/";
console.log("url",urlApi);

const urlWebServices = {

    //marcas o empresas
    obtenerEmpresas: urlApi +"empresas",
    obtenerRubros: urlApi +"productos/rubro",
    obtenerCategoriasPorRubro: urlApi +"/productos/rubro/",
    
    //usuarios
    editarDatosUsuario: urlApi +"/usuarios/"
    
}

export default urlWebServices;