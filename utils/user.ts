import axios from "axios";

const USER_URL = process.env.EXPO_PUBLIC_USER_API_URL;

const createUser = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string
): Promise<string> => {
  const response = await axios.post(USER_URL + "/user_v1/user/register", {
    email,
    password,
    firstname,
    lastname,
  });

  return response.data.email;
};

const user = { createUser };

export default user;
