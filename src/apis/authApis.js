const baseBackendURL = "http://marketplace-back.deliver.ar";

export const getLoggedInInformation = async () => {
  let url = baseBackendURL + `/login`;
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

export const logoutFromSession = async () => {
  let url = baseBackendURL + `/logout`;
  await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      Origin: baseBackendURL,
    },
  }).catch((error) => {
    console.error(error);
    throw new Error(error);
  });
  return;
};
