import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { PARKING_LOT_URL } from "..";

import { ParkingLot } from "@/types/parking-lot";
import apiRequest, { HTTPMethod } from "@/utils/http";

type GetMyParkingLotsInput = {
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
};

type GetMyParkingLotsService = (
  input: GetMyParkingLotsInput
) => Promise<ParkingLot[]>;

export const getMyParkingLots: GetMyParkingLotsService = async ({ auth }) => {
  const data = await apiRequest<ParkingLot[]>(
    PARKING_LOT_URL + `/parkinglot_v1/parkinglot/my`,
    HTTPMethod.GET,
    auth.accessToken,
    auth.authenticate
  );
  return data;
};

export const useGetMyParkingLots = (
  input: GetMyParkingLotsInput
): UseQueryResult<ParkingLot[], AxiosError> => {
  return useQuery({
    queryKey: ["parking-lot"],
    queryFn: async () => getMyParkingLots(input),
    refetchOnWindowFocus: false,
    refetchInterval: 0,
  });
};
