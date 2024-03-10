import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { PARKING_LOT_URL } from "..";

import { ParkingLot } from "@/types/parking-lot/ParkingLot";
import apiRequest, { HTTPMethod } from "@/utils/http";

type GerParkingSpacesInput = {
  queryParams: {
    postal_code: string;
    lat: number;
    long: number;
    radius?: string;
  };
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
};

type GerParkingSpacesService = (
  input: GerParkingSpacesInput
) => Promise<ParkingLot[]>;

export const getParkingSpacesByLatLong: GerParkingSpacesService = async ({
  queryParams,
  auth,
}) => {
  const { postal_code, lat, long, radius } = queryParams;
  const data = await apiRequest<ParkingLot[]>(
    PARKING_LOT_URL +
      `/parkinglot_v1/parkinglot/nearby?zip_code=${postal_code}&lat=${lat}&long=${long}&radius=${
        radius ?? 5
      }`,
    HTTPMethod.GET,
    auth.accessToken,
    auth.authenticate
  );
  return data;
};

export const useGetParkingSpacesByLatLong = (
  input: GerParkingSpacesInput
): UseQueryResult<ParkingLot[], AxiosError> => {
  return useQuery({
    queryKey: ["postal-code-latlng-radius", input.queryParams],
    queryFn: async () => getParkingSpacesByLatLong(input),
    refetchOnWindowFocus: false,
    refetchInterval: 0,
  });
};
