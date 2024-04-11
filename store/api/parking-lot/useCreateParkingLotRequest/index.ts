import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ParkingLot } from "@/types/parking-lot";
import apiRequest, { HTTPMethod } from "@/utils/http";

type CreateParkingLotRequestInput = {
  data: ParkingLot;
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
};

export type CreateParkingLotRequestService = (
  input: CreateParkingLotRequestInput
) => Promise<ParkingLot>;

const PARKING_LOT_URL = process.env.EXPO_PUBLIC_PARKING_LOT_API_URL;

export const createParkingLotRequest: CreateParkingLotRequestService = async (
  input: CreateParkingLotRequestInput
) => {
  const { data, auth } = input;
  const response = await apiRequest<ParkingLot>(
    PARKING_LOT_URL + `/parkinglot_v1/parkinglot/request/create`,
    HTTPMethod.POST,
    auth.accessToken,
    auth.authenticate,
    data
  );
  return response;
};

export const useCreateParkingLotRequest = (
  options?: MutationOptions<
    ParkingLot,
    AxiosError,
    CreateParkingLotRequestInput,
    unknown
  >
): UseMutationResult<ParkingLot, AxiosError, CreateParkingLotRequestInput> => {
  return useMutation({
    mutationFn: createParkingLotRequest,
    retry: 0,
    ...options,
  });
};
