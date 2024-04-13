import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { USER_URL } from "..";

import { Profile } from "@/types/user";
import apiRequest, { HTTPMethod } from "@/utils/http";

interface DeleteUserCarInput {
  body: { car_id: string };
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
}

type DeleteUserCarService = (input: DeleteUserCarInput) => Promise<Profile>;

export const deleteUserCar: DeleteUserCarService = async ({ body, auth }) => {
  const profile = await apiRequest<Profile>(
    USER_URL + "/user/delete-car",
    HTTPMethod.POST,
    auth.accessToken,
    auth.authenticate,
    body
  );
  return profile;
};

export const useDeleteUserCar = (
  options?: MutationOptions<Profile, AxiosError, DeleteUserCarInput>
): UseMutationResult<Profile, AxiosError, DeleteUserCarInput> =>
  useMutation({
    mutationFn: deleteUserCar,
    retry: 0,
    ...options,
  });
