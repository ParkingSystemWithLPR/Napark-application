import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { BOOKING_URL } from "..";

import apiRequest, { HTTPMethod } from "@/utils/http";
import { AvailableSlotResponse } from "@/types/booking";

export interface GetAvailableSlotsQueryParam {
  parkinglot_id: string;
  start_date: string | null;
  start_time: string | null;
  end_date: string | null;
  end_time: string | null;
  is_for_disabled: boolean;
}

type GetAvailableSlotsInput = {
  queryParams: GetAvailableSlotsQueryParam;
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
};

type GetAvailableSlotsService = (
  input: GetAvailableSlotsInput
) => Promise<AvailableSlotResponse>;

export const getAvailableSlot: GetAvailableSlotsService = async ({
  queryParams,
  auth,
}) => {
  const {
    parkinglot_id,
    start_date,
    start_time,
    end_date,
    end_time,
    is_for_disabled,
  } = queryParams;
  const data = await apiRequest<AvailableSlotResponse>(
    BOOKING_URL +
      `/booking_v1/available-slots?parkinglot_id=${parkinglot_id}&start_date=${start_date}&start_time=${start_time}&end_date=${end_date}&end_time=${end_time}&is_for_disabled=${
        is_for_disabled ? "true" : "false"
      }`,
    HTTPMethod.GET,
    auth.accessToken,
    auth.authenticate
  );
  return data;
};

export const useGetAvailableSlot = (
  input: GetAvailableSlotsInput
): UseQueryResult<AvailableSlotResponse, AxiosError> => {
  const { queryParams } = input;
  return useQuery({
    queryKey: ["postal-code-latlng-end_date", queryParams],
    queryFn: async () => getAvailableSlot(input),
    refetchOnWindowFocus: false,
    refetchInterval: 0,
    enabled:
      !!queryParams.start_date &&
      !!queryParams.start_time &&
      !!queryParams.end_date &&
      !!queryParams.end_time,
  });
};
