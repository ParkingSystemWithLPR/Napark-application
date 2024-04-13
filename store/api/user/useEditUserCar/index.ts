import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { USER_URL } from "..";

import { Profile } from "@/types/user";
import apiRequest, { HTTPMethod } from "@/utils/http";

interface EditUserCarInput {
  body: { car_id: string };
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
}

type EditUserCarService = (input: EditUserCarInput) => Promise<Profile>;

export const editUserCar: EditUserCarService = async ({ body, auth }) => {
  const profile = await apiRequest<Profile>(
    USER_URL + "/user/default-car",
    HTTPMethod.PATCH,
    auth.accessToken,
    auth.authenticate,
    body
  );
  return profile;
};

export const useEditUserCar = (
  options?: MutationOptions<Profile, AxiosError, EditUserCarInput>
): UseMutationResult<Profile, AxiosError, EditUserCarInput> =>
  useMutation({
    mutationFn: editUserCar,
    retry: 0,
    ...options,
  });
