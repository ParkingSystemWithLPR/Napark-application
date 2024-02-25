import axios from "axios";
import { ParkingLot } from "../../../types/parking-lot/ParkingLot";

export interface GetParkingLotsOutput {
  data: {
    parkingLots: ParkingLot[];
    count: number;
  };
}

export type GetParkingLotsService = (userId: string) => Promise<GetParkingLotsOutput>;

const PARKING_LOT_URL = process.env.EXPO_PUBLIC_PARKING_LOT_API_URL;

export const getParkingLots: GetParkingLotsService = async (userId: string) => {
  const { data } = await axios.get("http://localhost:1324"+ `/parkinglot_v1/parkinglot/${userId}`);
  return data;
};

// export const useGetParkingLots = ( queryParams?: GetParkingLotsInput ): UseQueryResult
