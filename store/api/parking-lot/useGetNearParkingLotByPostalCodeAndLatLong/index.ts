import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { PARKING_LOT_URL } from "..";

import { ParkingLot } from "@/types/parking-lot";
import apiRequest, { HTTPMethod } from "@/utils/http";

type GerParkingSpacesInput = {
  queryParams: {
    postal_code: string | undefined;
    lat: number | undefined;
    long: number | undefined;
    radius?: string;
    start_date?: string;
    end_date?: string;
    start_time?: string;
    end_time?: string;
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
  const {
    postal_code,
    lat,
    long,
    radius,
    start_date,
    end_date,
    start_time,
    end_time,
  } = queryParams;
  const filterString = !!start_date
    ? `&start_date=${start_date}&end_date=${end_date}&start_time=${start_time}&end_time=${end_time}`
    : "";
  const data = await apiRequest<ParkingLot[]>(
    PARKING_LOT_URL +
      `/parkinglot_v1/parkinglot/nearby?zip_code=${postal_code}&lat=${lat}&long=${long}&radius=${
        radius ?? 5
      }` +
      filterString,
    HTTPMethod.GET,
    auth.accessToken,
    auth.authenticate
  );
  return data;
};

export const useGetParkingSpacesByLatLong = (
  input: GerParkingSpacesInput
): UseQueryResult<ParkingLot[], AxiosError> => {
  const { queryParams } = input;
  return useQuery({
    queryKey: ["postal-code-latlng-radius", queryParams],
    queryFn: async () => getParkingSpacesByLatLong(input),
    refetchOnWindowFocus: false,
    refetchInterval: 60000,
    enabled:
      !!queryParams.postal_code && !!queryParams.lat && !!queryParams.long,
  });
};
