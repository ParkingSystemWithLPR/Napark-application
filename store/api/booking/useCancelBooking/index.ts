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
  bookingId: string;
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
}

type CancelBookingService = (input: CancelBookingInput) => Promise<Profile>;

export const cancelBooking: CancelBookingService = async ({
  bookingId,
  auth,
}) => {
  const profile = await apiRequest<Profile>(
    BOOKING_URL + `/booking_v1/${bookingId}/cancel`,
    HTTPMethod.PUT,
    auth.accessToken,
    auth.authenticate
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
