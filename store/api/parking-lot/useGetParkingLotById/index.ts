import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { PARKING_LOT_URL } from "..";

import { ParkingLot } from "@/types/parking-lot/ParkingLot";
import apiRequest, { HTTPMethod } from "@/utils/http";

type GetParkingLotInput = {
  queryParams: {
    parkingLotId: string;
  };
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
};

type GetParkingLotService = (input: GetParkingLotInput) => Promise<ParkingLot>;

export const getParkingLot: GetParkingLotService = async ({
  queryParams,
  auth,
}) => {
  const data = await apiRequest<ParkingLot>(
    PARKING_LOT_URL + `/parkinglot_v1/parkinglot/${queryParams.parkingLotId}`,
    HTTPMethod.GET,
    auth.accessToken,
    auth.authenticate
  );
  return data;
};

export const useGetParkingLot = (
  input: GetParkingLotInput
): UseQueryResult<ParkingLot, AxiosError> => {
  return useQuery({
    queryKey: ["parking-lot", input.queryParams],
    queryFn: async () => getParkingLot(input),
    refetchOnWindowFocus: false,
    refetchInterval: 0,
  });
};
