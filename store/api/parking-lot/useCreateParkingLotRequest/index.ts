import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ParkingLotRequest } from "@/types/parking-lot";
import apiRequest, { HTTPMethod } from "@/utils/http";
import { ParkingLotRequest } from "@/types/parking-lot";

export type CreateParkingLotRequestInput = {
  data: ParkingLotRequest;
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
};

export type CreateParkingLotRequestService = (
  input: CreateParkingLotRequestInput
) => Promise<ParkingLotRequest>;

const PARKING_LOT_URL = process.env.EXPO_PUBLIC_PARKING_LOT_API_URL;

export const createParkingLotRequest: CreateParkingLotRequestService = async (
  input: CreateParkingLotRequestInput
) => {
  const { data, auth } = input;
  const response = await apiRequest<ParkingLotRequest>(
    PARKING_LOT_URL + `/parkinglot_v1/request/create`,
    HTTPMethod.POST,
    auth.accessToken,
    auth.authenticate,
    data
  );
  return response;
};

export const useCreateParkingLotRequest = (
  options?: MutationOptions<
    ParkingLotRequest,
    AxiosError,
    CreateParkingLotRequestInput,
    unknown
  >
): UseMutationResult<
  ParkingLotRequest,
  AxiosError,
  CreateParkingLotRequestInput
> => {
  return useMutation({
    mutationFn: createParkingLotRequest,
    retry: 0,
    ...options,
  });
};
