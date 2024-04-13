import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { USER_URL } from "..";

import { Profile } from "@/types/user";
import apiRequest, { HTTPMethod } from "@/utils/http";

export interface EditProfileInput {
  body: {
    firstname: string;
    lastname: string;
    tel: string;
    date_of_birth: string;
  };
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
}

type EditProfileService = (input: EditProfileInput) => Promise<Profile>;

export const editProfile: EditProfileService = async ({ body, auth }) => {
  const data = await apiRequest<Profile>(
    USER_URL + "/user/edit",
    HTTPMethod.PATCH,
    auth.accessToken,
    auth.authenticate,
    body
  );
  return data;
};

export const useEditProfile = (
  options?: MutationOptions<Profile, AxiosError, EditProfileInput>
): UseMutationResult<Profile, AxiosError, EditProfileInput> =>
  useMutation({
    mutationFn: editProfile,
    retry: 0,
    ...options,
  });
