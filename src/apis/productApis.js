const baseBackendURL = "https://marketplace-back.deliver.ar";

export const obtenerProductosPorEmpresa = async (cid) => {
  let url = baseBackendURL + `/empresas/${cid}`;
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
