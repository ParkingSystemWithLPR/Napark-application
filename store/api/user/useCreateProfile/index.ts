import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { USER_URL } from "..";

interface CreateProfileInput {
  body: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  };
}

type CreateProfileService = (input: CreateProfileInput) => Promise<string>;

export const createUser: CreateProfileService = async ({ body }) => {
  const response = await axios.post(USER_URL + "/user/register", body);
  return response.data.email;
};

export const useCreateProfile = (
  options?: MutationOptions<string, AxiosError, CreateProfileInput>
): UseMutationResult<string, AxiosError, CreateProfileInput> =>
  useMutation({
    mutationFn: createUser,
    retry: 0,
    ...options,
  });
