import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;
const baseUrl = serverUrl + "/api/v1";

export const fetchContent = async (url) => {
  const response = await axios.get(`${baseUrl}${url}`);
  return response.data;
};

export const postContent = async (url, body) => {
  const response = await axios.post(`${baseUrl}${url}`, body);
  return response.data;
};

export const updateContent = async (url, updatedData) => {
  const response = await axios.put(`${baseUrl}${url}`, updatedData);
  return response.data;
};

export const deleteContent = async (url) => {
  const response = await axios.delete(`${baseUrl}${url}`);
  return response.data;
};
