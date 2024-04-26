import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { PARKING_LOT_URL } from "..";

import { SlotType } from "@/enum/SlotType";
import { ParkingLot } from "@/types/parking-lot";
import apiRequest, { HTTPMethod } from "@/utils/http";

type GerParkingSpacesInput = {
  queryParams: {
    postal_code?: string;
    lat?: number;
    long?: number;
    radius?: string;
    start_date?: string;
    end_date?: string;
    start_time?: string;
    end_time?: string;
    slot_type?: SlotType;
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
    slot_type,
  } = queryParams;
  const filterString = !!start_date
    ? `&start_date=${start_date}&end_date=${end_date}&start_time=${start_time}&end_time=${end_time}`
    : "";
  const data = await apiRequest<ParkingLot[]>(
    PARKING_LOT_URL +
      `/parkinglot_v1/parkinglot/nearby?zip_code=${postal_code}&lat=${lat}&long=${long}&radius=${
        radius ?? 5
      }&slot_type=${slot_type ?? SlotType.Normal}` +
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
    retry: 0,
    enabled:
      !!queryParams.postal_code && !!queryParams.lat && !!queryParams.long,
  });
};
