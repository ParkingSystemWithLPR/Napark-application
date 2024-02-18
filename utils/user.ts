import apiRequest, { METHOD } from "./http";

const USER_URL = process.env.EXPO_PUBLIC_USER_API_URL;

const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  const response = await apiRequest(
    USER_URL + "/user_v1/user/register",
    METHOD.POST,
    {
      email,
      password,
      username,
    }
  );
  return response;
};

const user = { createUser };

export default user;
