import urlWebServices from './webserviceController';

export const obtenerPedidosUsuario = async function (dni) {
    let url = urlWebServices.obtenerPedidosUsuario +`${dni}`;
    console.log("url", url)
    try {
        let response = await fetch(url, {
            method: 'GET',
            mode: "cors",
            headers: {
                'Origin': 'http://ec2-52-7-119-146.compute-1.amazonaws.com/'
            }
        });
        if (response.status === 200) {
            let data = await response.json();
            let listaPedidos = data
            console.log("data pedidos", data)
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
