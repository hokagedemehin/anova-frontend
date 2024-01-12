import axios from "axios";

export const post_requests = async (
  url: string,
  data: any,
  token: string = "",
) => {
  let headers = {};
  if (token !== "") {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
    data,
    { headers },
  );
  return response;
};

export const get_requests = async (url: string, token: string = "") => {
  let headers = {};
  if (token !== "") {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
    { headers },
  );
  return response;
};

export const put_requests = async (
  url: string,
  data: any,
  token: string = "",
) => {
  let headers = {};
  if (token !== "") {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
    data,
    { headers },
  );
  return response;
};

export const delete_requests = async (url: string, token: string = "") => {
  let headers = {};
  if (token !== "") {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
    { headers },
  );
  return response;
};

export const patch_requests = async (
  url: string,
  data: any,
  token: string = "",
) => {
  let headers = {};
  if (token !== "") {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
    data,
    { headers },
  );
  return response;
};
