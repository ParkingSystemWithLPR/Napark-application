import axios from "axios";
import apiRequest, { METHOD } from "./http";

const USER_URL = process.env.EXPO_PUBLIC_USER_API_URL + "/user_v1";

export interface Car {
  license_plate: string;
  province_of_reg: string;
  is_default: boolean;
}

export interface Profile {
  firstname: string;
  lastname: string;
  email: string;
  tel: string;
  date_of_birth: string;
  user_car: Car[];
}

export interface EditProfile {
  firstname: string;
  lastname: string;
  tel: string;
  date_of_birth: string;
}

const createUser = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string
): Promise<string> => {
  const response = await axios.post(USER_URL + "/user/register", {
    email,
    password,
    firstname,
    lastname,
  });

  return response.data.email;
};

const getProfile = async (
  accessToken: string,
  authenticate: (accessToken: string, refreshToken: string) => void
): Promise<Profile> => {
  const profile = await apiRequest<Profile>(
    USER_URL + "/user/myinfo",
    METHOD.GET,
    accessToken,
    authenticate
  );

  return profile;
};

const editProfile = async (
  newProfile: EditProfile,
  accessToken: string,
  authenticate: (accessToken: string, refreshToken: string) => void
) => {
  await apiRequest(
    USER_URL + "/user/edit",
    METHOD.POST,
    accessToken,
    authenticate,
    newProfile
  );
};

const user = { createUser, getProfile, editProfile };

export default user;
