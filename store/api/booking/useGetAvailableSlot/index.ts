import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { BOOKING_URL } from "..";

import { SlotType } from "@/enum/SlotType";
import { AvailableSlotResponse } from "@/types/booking";
import apiRequest, { HTTPMethod } from "@/utils/http";

export interface GetAvailableSlotsQueryParam {
  parkinglot_id: string;
  start_date: string | null;
  start_time: string | null;
  end_date: string | null;
  end_time: string | null;
  slot_type: SlotType;
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
    slot_type,
  } = queryParams;
  const data = await apiRequest<AvailableSlotResponse>(
    BOOKING_URL +
      `/booking_v1/available-slots?parkinglot_id=${parkinglot_id}&start_date=${start_date}&start_time=${start_time}&end_date=${end_date}&end_time=${end_time}&slot_type=${slot_type}`,
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
