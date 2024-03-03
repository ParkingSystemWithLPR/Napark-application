import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { USER_URL } from "..";

import { Profile } from "@/types/user";

interface CreateProfileInput {
  body: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  };
}

type CreateProfileService = (input: CreateProfileInput) => Promise<Profile>;

export const createUser: CreateProfileService = async ({ body }) => {
  const response = await axios.post(USER_URL + "/user/register", body);
  return response.data;
};

export const useCreateProfile = (
  options?: MutationOptions<Profile, AxiosError, CreateProfileInput>
): UseMutationResult<Profile, AxiosError, CreateProfileInput> =>
  useMutation({
    mutationFn: createUser,
    retry: 0,
    ...options,
  });
