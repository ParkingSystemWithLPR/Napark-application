import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { BOOKING_URL } from "..";

import { Booking } from "@/types/booking";
import apiRequest, { HTTPMethod } from "@/utils/http";

type getMyBookingssInput = {
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
};

type getMyBookingssService = (input: getMyBookingssInput) => Promise<Booking[]>;

export const getMyBookings: getMyBookingssService = async ({ auth }) => {
  const data = await apiRequest<Booking[]>(
    BOOKING_URL + `/booking_v1/my-bookings`,
    HTTPMethod.GET,
    auth.accessToken,
    auth.authenticate
  );
  return data;
};

export const useGetMyBookings = (
  input: getMyBookingssInput
): UseQueryResult<Booking[], AxiosError> => {
  return useQuery({
    queryKey: [],
    queryFn: async () => getMyBookings(input),
    refetchOnWindowFocus: false,
    refetchInterval: 0,
  });
};
