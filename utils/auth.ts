import axios from "axios";

const AUTH_URL = process.env.EXPO_PUBLIC_AUTH_API_URL;
const USER_URL = process.env.EXPO_PUBLIC_USER_API_URL;

const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  const response = await axios.post(USER_URL + "/user_v1/user/register", {
    email,
    password,
    username,
  });
  return response.data;
};

const login = async (email: string, password: string) => {
  const response = await axios.post(AUTH_URL + "/auth_v1/auth/login", {
    email,
    password,
  });
  return response.data;
};

const auth = { createUser, login };

export default auth;
