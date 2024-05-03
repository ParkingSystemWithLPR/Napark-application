import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { BOOKING_URL } from "..";
import { UpdateParkingLotInput } from "../../parking-lot/useUpdateParkingLot";

import apiRequest, { HTTPMethod } from "@/utils/http";

interface UpdateBookingTimeRequest {
  booking_id: string;
  extend_date: string;
  extend_time: string;
}

interface UpdateBookingTimeInput {
  queryParams: UpdateBookingTimeRequest;
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
}

type UpdateBookingTimeService = (
  input: UpdateBookingTimeInput
) => Promise<void>;

export const updateBookingTime: UpdateBookingTimeService = async ({
  queryParams,
  auth,
}) => {
  const { booking_id, extend_date, extend_time } = queryParams;
  console.log(booking_id, extend_date, extend_time)
  await apiRequest<void>(
    BOOKING_URL + `/booking_v1/booking/${booking_id}/extend`,
    HTTPMethod.POST,
    auth.accessToken,
    auth.authenticate,
    { extend_date: extend_date, extend_time: extend_time }
  );
};

export const useUpdateBookingTime = (
  options?: MutationOptions<void, AxiosError, UpdateBookingTimeInput>
): UseMutationResult<void, AxiosError, UpdateBookingTimeInput> =>
  useMutation({
    mutationFn: updateBookingTime,
    retry: 0,
    ...options,
  });
