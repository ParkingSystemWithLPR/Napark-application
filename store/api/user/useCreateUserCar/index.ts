import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { USER_URL } from "..";

import { Car, Profile } from "@/types/user";

export interface CreateUserCarInput {
  body: Car;
}

type CreateUserCarService = (input: CreateUserCarInput) => Promise<Profile>;

export const createUserCar: CreateUserCarService = async ({ body }) => {
  const response = await axios.post(USER_URL + "/user/add-car", body);
  return response.data;
};

export const useCreateUserCar = (
  options?: MutationOptions<Profile, AxiosError, CreateUserCarInput>
): UseMutationResult<Profile, AxiosError, CreateUserCarInput> =>
  useMutation({
    mutationFn: createUserCar,
    retry: 0,
    ...options,
  });
