import urlWebServices from './webserviceController';

export const obtenerPedidosUsuario = async function (uId) {
    let url = urlWebServices.obtenerPedidosUsuario +`${uId}`;
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
            let listaPedidos = data
            console.log(data)
            return listaPedidos;
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
