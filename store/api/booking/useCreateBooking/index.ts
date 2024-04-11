import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { BOOKING_URL } from "..";

import apiRequest, { HTTPMethod } from "@/utils/http";
import { Booking, CreateBookingRequest } from "@/types/booking/Booking";

interface CreateBookingInput {
  body: CreateBookingRequest;
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
}

type CreateBookingService = (input: CreateBookingInput) => Promise<Booking>;

export const createBooking: CreateBookingService = async ({ body, auth }) => {
  const booking = await apiRequest<Booking>(
    BOOKING_URL + "/booking_v1/booking/create",
    HTTPMethod.POST,
    auth.accessToken,
    auth.authenticate,
    body
  );
  return booking;
};

export const useCreateBooking = (
  options?: MutationOptions<Booking, AxiosError, CreateBookingInput>
): UseMutationResult<Booking, AxiosError, CreateBookingInput> =>
  useMutation({
    mutationFn: createBooking,
    retry: 0,
    ...options,
  });
