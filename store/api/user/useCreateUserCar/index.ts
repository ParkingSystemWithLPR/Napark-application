import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { USER_URL } from "..";

import { Profile } from "@/types/user";
import apiRequest, { HTTPMethod } from "@/utils/http";

interface CarWithDefaultFlag {
  license_plate: string;
  province_of_reg: string;
  is_default: boolean;
}

interface CreateUserCarInput {
  body: CarWithDefaultFlag;
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
}

type CreateUserCarService = (input: CreateUserCarInput) => Promise<Profile>;

export const createUserCar: CreateUserCarService = async ({ body, auth }) => {
  const profile = await apiRequest<Profile>(
    USER_URL + "/user/add-car",
    HTTPMethod.POST,
    auth.accessToken,
    auth.authenticate,
    body
  );
  return profile;
};

export const useCreateUserCar = (
  options?: MutationOptions<Profile, AxiosError, CreateUserCarInput>
): UseMutationResult<Profile, AxiosError, CreateUserCarInput> =>
  useMutation({
    mutationFn: createUserCar,
    retry: 0,
    ...options,
  });
