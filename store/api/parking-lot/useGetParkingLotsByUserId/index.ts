import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ParkingLot } from "@/types/parking-lot/ParkingLot";
import apiRequest, { HTTPMethod } from "@/utils/http";

type GetParkingLotsInput = {
  queryParams: {
    userId: string;
  };
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
};

type GetParkingLotsService = (
  input: GetParkingLotsInput
) => Promise<ParkingLot[]>;

const PARKING_LOT_URL = process.env.EXPO_PUBLIC_PARKING_LOT_API_URL;

export const getParkingLotByUserId: GetParkingLotsService = async ({
  queryParams,
  auth,
}) => {
  const data = await apiRequest<ParkingLot[]>(
    PARKING_LOT_URL + `/parkinglot_v1/parkinglot/own/${queryParams.userId}`,
    HTTPMethod.GET,
    auth.accessToken,
    auth.authenticate
  );
  return data;
};

export const useGetParkingLotsByUserId = (
  input: GetParkingLotsInput
): UseQueryResult<ParkingLot[], AxiosError> => {
  return useQuery({
    queryKey: ["parking-lot", input.queryParams],
    queryFn: async () => getParkingLotByUserId(input),
    refetchOnWindowFocus: false,
    refetchInterval: 0,
  });
};
