import axios, { AxiosError } from "axios";
import { ParkingLot } from "../../../types/parking-lot/ParkingLot";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

type GetParkingLotService = (
  parkingLotId: string
) => Promise<ParkingLot>;

const PARKING_LOT_URL = process.env.EXPO_PUBLIC_PARKING_LOT_API_URL;

export const getParkingLot: GetParkingLotService = async (parkingLotId: string) => {
  const { data } = await axios.get(
    PARKING_LOT_URL + `/parkinglot_v1/parkinglot/${parkingLotId}`
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
