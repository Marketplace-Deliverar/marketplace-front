import urlWebServices from './webserviceController';

export const obtenerDatosUsuario = async function (uId) {
    const url = urlWebServices.obtenerDatosUsuario + `${uId}`; // Agrega el ID del usuario a la URL
    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Origin': 'https://xorn7asoxb4eecmwmszz5fbc3a0wamui.lambda-url.us-east-1.on.aws/'
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            console.log("obtengo data?:", data)
            return data;
        } else {
            console.error("Error al obtener datos del usuario. Código de estado:", response.status);
            return null; // Devuelve null en caso de error
        }
    } catch (error) {
        console.error(`Error al obtener datos del usuario: ${error}`);
        throw error;
    }
};

export const editarDatosUsuario = async function (userId, userData) {
    const url = urlWebServices.editarDatosUsuario +`${userId}`; // Debes incluir el userId en la URL
    console.log(userData)
    try {
        let response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Origin': 'https://xorn7asoxb4eecmwmszz5fbc3a0wamui.lambda-url.us-east-1.on.aws/',
            },
            body: userData,
            
        });

        let rdo = response.status;
        let data = await response.json();
        console.log("Nueva data:", data);

        switch (rdo) {
            case 200: {
                // No actualices userData aquí; ya lo tienes actualizado en el componente
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
        // Puedes manejar el error de una manera más adecuada según tus necesidades
    }
}
