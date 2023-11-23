const baseBackendURL = "http://marketplace-back.deliver.ar";

export const getbrandByURL = async (brandURL) => {
  let url = baseBackendURL + `/empresas/url/${brandURL}`;
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
