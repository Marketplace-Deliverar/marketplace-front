const baseBackendURL =
  "https://xorn7asoxb4eecmwmszz5fbc3a0wamui.lambda-url.us-east-1.on.aws";

export const obtenerProductosPorEmpresa = async (cid) => {
  let url = baseBackendURL + `/productos/empresa/${cid}`;
  let result = [];
  await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      Origin: baseBackendURL,
    },
  })
    .then(async (response) => {
      let data = await response.json();
      result = data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
  return result;
};
