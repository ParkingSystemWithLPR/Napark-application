import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { BOOKING_URL } from "..";

import { ExtendedTime } from "@/types/booking";
import apiRequest, { HTTPMethod } from "@/utils/http";

export interface GetPossibleExtendTimeParam {
  booking_id: string;
}

type GetPossibleExtendTimeInput = {
  queryParams: GetPossibleExtendTimeParam;
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
};

type GetPossibleExtendTimeService = (
  input: GetPossibleExtendTimeInput
) => Promise<ExtendedTime>;

export const getPossibleExtendTime: GetPossibleExtendTimeService = async ({
  queryParams,
  auth,
}) => {
  const { booking_id } = queryParams;
  const data = await apiRequest<ExtendedTime>(
    BOOKING_URL + `/booking_v1/booking/${booking_id}/extend-time`,
    HTTPMethod.GET,
    auth.accessToken,
    auth.authenticate
  );
  return data;
};

export const useGetPossibleExtendTime = (
  input: GetPossibleExtendTimeInput
): UseQueryResult<ExtendedTime, AxiosError> => {
  return useQuery({
    queryKey: [],
    queryFn: async () => getPossibleExtendTime(input),
    refetchOnWindowFocus: false,
    refetchInterval: 0,
    retry: 0,
  });
};
