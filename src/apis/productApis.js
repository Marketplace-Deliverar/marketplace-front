const baseBackendURL = "https://ec2-52-7-119-146.compute-1.amazonaws.com";

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
