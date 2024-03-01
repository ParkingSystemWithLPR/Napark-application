import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ParkingLot } from "../../../types/parking-lot/ParkingLot";
import apiRequest, { METHOD } from "../../../utils/http";
import { useAuth } from "../../context/auth";

type GetParkingLotService = (parkingLotId: string) => Promise<ParkingLot>;

const PARKING_LOT_URL = process.env.EXPO_PUBLIC_PARKING_LOT_API_URL;

export const getParkingLot: GetParkingLotService = async (
  parkingLotId: string
) => {
  const { accessToken, authenticate } = useAuth();
  const data = await apiRequest<ParkingLot>(
    PARKING_LOT_URL + `/parkinglot_v1/parkinglot/${parkingLotId}`,
    METHOD.GET,
    accessToken,
    authenticate
  );
  return data;
};

export const useGetParkingLot = (
  parkingLotId: string
): UseQueryResult<ParkingLot[], AxiosError> => {
  return useQuery({
    queryKey: ["parking-lot", parkingLotId],
    queryFn: async () => getParkingLot(parkingLotId),
  });
};
