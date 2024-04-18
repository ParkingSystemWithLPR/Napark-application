import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { USER_URL } from "..";

import { User } from "@/types/user";
import apiRequest, { HTTPMethod } from "@/utils/http";

export type AllUsers = {
  users: User[];
  search: string;
  limit: number;
  count: number;
};

interface GetUserInput {
  queryParams: {
    searchName?: string;
    limit?: number;
  };
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
}

type GetAllUsersService = (input: GetUserInput) => Promise<AllUsers>;

export const getAllUsers: GetAllUsersService = async ({
  queryParams,
  auth,
}) => {
  const data = await apiRequest<AllUsers>(
    USER_URL +
      `/users?search=${queryParams.searchName ?? ""}&limit=${
        queryParams.limit ?? 50
      }`,
    HTTPMethod.GET,
    auth.accessToken,
    auth.authenticate
  );
  return data;
};

export const useGetAllUsers = (
  input: GetUserInput
): UseQueryResult<AllUsers, AxiosError> => {
  return useQuery({
    queryKey: ["get-users", input.queryParams],
    queryFn: async () => getAllUsers(input),
    refetchOnWindowFocus: false,
    refetchInterval: 0,
  });
};
