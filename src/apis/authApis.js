const baseBackendURL = "http://ec2-52-7-119-146.compute-1.amazonaws.com";

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
