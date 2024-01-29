import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;
const baseUrl = serverUrl + "/api/v1";
const loginPageUrl = serverUrl + "/";

const asyncWrapper = (fn) => {
  return async (params) => {
    try {
      return await fn(params);
    } catch (error) {
      const errorData = error.response.data;
      console.log("Error: ", errorData);
      if (errorData.statusCode === 401) {
        window.location.href = loginPageUrl;
        // return errorData;
      } else {
        return errorData;
      }
    }
  };
};

export const fetchContent = asyncWrapper(async (url) => {
  const response = await axios.get(`${baseUrl}${url}`);
  return response.data;
});

export const postContent = asyncWrapper(async (url, body) => {
  const response = await axios.post(`${baseUrl}${url}`, body);
  return response.data;
});

export const updateContent = asyncWrapper(async (url, updatedData) => {
  const response = await axios.put(`${baseUrl}${url}`, updatedData);
  return response.data;
});

export const deleteContent = asyncWrapper(async (url) => {
  const response = await axios.delete(`${baseUrl}${url}`);
  return response.data;
});
