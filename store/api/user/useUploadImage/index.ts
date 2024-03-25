import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { USER_URL } from "..";

import { Profile } from "@/types/user";
import apiRequest, { HTTPMethod } from "@/utils/http";

export interface UploadImageInput {
  body: FormData;
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
}

type UploadImageService = (input: UploadImageInput) => Promise<Profile>;

export const uploadImage: UploadImageService = async ({ body, auth }) => {
  console.log(body);
  const data = await apiRequest<Profile>(
    USER_URL + "/user/upload-image",
    HTTPMethod.POST,
    auth.accessToken,
    auth.authenticate,
    body,
    {
      "Content-Type": "multipart/form-data",
    }
  );
  return data;
};

export const useUploadImage = (
  options?: MutationOptions<Profile, AxiosError, UploadImageInput>
): UseMutationResult<Profile, AxiosError, UploadImageInput> =>
  useMutation({
    mutationFn: uploadImage,
    retry: 0,
    ...options,
  });
