import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { ParkingLot } from "../../../types/parking-lot/ParkingLot";

type GetParkingLotsService = (userId: string) => Promise<ParkingLot[]>;

const PARKING_LOT_URL = process.env.EXPO_PUBLIC_PARKING_LOT_API_URL;

export const getParkingLotByUserId: GetParkingLotsService = async (
  userId: string
) => {
  const { data } = await axios.get(
    PARKING_LOT_URL + `/parkinglot_v1/parkinglot/${userId}`
  );
  return data;
};

export const useGetParkingLotsByUserId = (
  userId: string
): UseQueryResult<ParkingLot[], AxiosError> => {
  return useQuery({
    queryKey: ["parking-lot", userId],
    queryFn: async () => getParkingLotByUserId(userId),
  });
};
