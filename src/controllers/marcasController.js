import urlWebServices from './webserviceController';

export const obtenerEmpresas = async function () {
    let url = urlWebServices.obtenerEmpresas;
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
            let listaEmpresas = data
            console.log(data)
            return listaEmpresas;
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

export const obtenerRubros = async function () {
    let url = urlWebServices.obtenerRubros;
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
            let listaRubros = data
            console.log(data)
            return listaRubros;
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

export const obtenerCategoriasPorRubro = async function (rubro) {
    let url = urlWebServices.obtenerCategoriasPorRubro + `${rubro}/categoria`;
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
            let listaCategoriasPorRubro = data
            console.log(data)
            return listaCategoriasPorRubro;
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
