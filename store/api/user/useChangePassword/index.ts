import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { USER_URL } from "..";

import apiRequest, { HTTPMethod } from "@/utils/http";

interface ChangePasswordInput {
  body: {
    email: string;
    old_password: string;
    new_password: string;
  };
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
}

type ChangePasswordService = (input: ChangePasswordInput) => Promise<void>;

export const changePassword: ChangePasswordService = async ({ body, auth }) => {
  await apiRequest<void>(
    USER_URL + "/user/change-password",
    HTTPMethod.POST,
    auth.accessToken,
    auth.authenticate,
    body
  );
};

export const useChangePassword = (
  options?: MutationOptions<void, AxiosError, ChangePasswordInput>
): UseMutationResult<void, AxiosError, ChangePasswordInput> =>
  useMutation({
    mutationFn: changePassword,
    retry: 0,
    ...options,
  });
