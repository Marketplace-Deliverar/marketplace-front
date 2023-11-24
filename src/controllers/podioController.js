import urlWebServices from './webserviceController';
let backendURL = "https://marketplace-back.deliver.ar/";

export const obtenerDatosPodio = async function () {
    let url = urlWebServices.podio
    try {
        let response = await fetch(url, {
            method: 'GET',
            mode: "cors",
            headers: {
                Origin: backendURL,
            },
        });
        if (response.status === 200) {
            let data = await response.json();
            let Podio = data
            console.log(data)
            return Podio;
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