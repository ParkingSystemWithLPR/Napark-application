import axios from "axios";

const url = process.env.EXPO_PUBLIC_BACKEND_URL;

const createUser = async (email: string, password: string) => {
  const response = await axios.post(url + "/create", { email, password });
  return response.data;
};

const login = async (email: string, password: string) => {
  const response = await axios.post(url + "/login", { email, password });
};

const auth = { createUser, login };

export default auth;
