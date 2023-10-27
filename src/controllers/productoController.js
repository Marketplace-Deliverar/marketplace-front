import urlWebServices from './webserviceController';

export const obtenerProductosEmpresa = async function (id) {
    let url = urlWebServices.obtenerProductosEmpresa + `${id}`;
    try {
        let response = await fetch(url, {
            method: 'GET',
            mode: "cors",
            headers: {
                'Origin': 'https://xorn7asoxb4eecmwmszz5fbc3a0wamui.lambda-url.us-east-1.on.aws/'
            }
        });
        if (response.status === 200) {
            let data = await response.json();
            let Productos = data
            console.log(data)
            return Productos;
        }
        else {
            console.error("Error al obtener empresas. Código de estado:", response.status);
            return [];
        }

    }
    catch (error) {
        throw new Error(`Error al obtener empresas: ${error}`);
    };
}