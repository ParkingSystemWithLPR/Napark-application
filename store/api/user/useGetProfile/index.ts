import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { USER_URL } from "..";

import { Profile } from "@/types/user";
import apiRequest, { HTTPMethod } from "@/utils/http";

interface GetProfileInput {
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
}

type GetProfileService = (input: GetProfileInput) => Promise<Profile>;
type GetAllProfilesService = (input: GetProfileInput) => Promise<Profile[]>;

export const getProfile: GetProfileService = async ({ auth }) => {
  const data = await apiRequest<Profile>(
    USER_URL + "/user/myinfo",
    HTTPMethod.GET,
    auth.accessToken,
    auth.authenticate
  );
  return data;
};

export const getAllProfile: GetAllProfilesService = async ({ auth }) => {
  // todo: add endpoint
  const data = await apiRequest<Profile[]>(
    USER_URL + "",
    HTTPMethod.GET,
    auth.accessToken,
    auth.authenticate
  );
  return data;
};

export const useGetProfile = (
  input: GetProfileInput
): UseQueryResult<Profile, AxiosError> => {
  return useQuery({
    queryKey: [],
    queryFn: async () => getProfile(input),
    refetchOnWindowFocus: false,
    refetchInterval: 0,
  });
};
