import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { BOOKING_URL } from "..";

import { Profile } from "@/types/user";
import apiRequest, { HTTPMethod } from "@/utils/http";

interface CancelBookingInput {
  body: { booking_id: string };
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
}

type CancelBookingService = (input: CancelBookingInput) => Promise<Profile>;

export const cancelBooking: CancelBookingService = async ({ body, auth }) => {
  const profile = await apiRequest<Profile>(
    BOOKING_URL + "/booking_v1/cancel",
    HTTPMethod.POST,
    auth.accessToken,
    auth.authenticate,
    body
  );
  return profile;
};

export const useCancelBooking = (
  options?: MutationOptions<Profile, AxiosError, CancelBookingInput>
): UseMutationResult<Profile, AxiosError, CancelBookingInput> =>
  useMutation({
    mutationFn: cancelBooking,
    retry: 0,
    ...options,
  });
