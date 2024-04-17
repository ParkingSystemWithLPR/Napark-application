import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { PARKING_LOT_URL } from "..";

import { ParkingLot } from "@/types/parking-lot";
import apiRequest, { HTTPMethod } from "@/utils/http";

type GetParkingLotsInput = {
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
};

type GetParkingLotsService = (
  input: GetParkingLotsInput
) => Promise<ParkingLot[]>;

export const getParkingLotByUserId: GetParkingLotsService = async ({
  auth,
}) => {
  const data = await apiRequest<ParkingLot[]>(
    PARKING_LOT_URL + `/parkinglot_v1/parkinglot/my`,
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
    queryKey: ["parking-lots"],
    queryFn: async () => getParkingLotByUserId(input),
    refetchOnWindowFocus: false,
    refetchInterval: 0,
  });
};
