import { ParkingLot } from "@/types/parking-lot";
import apiRequest, { HTTPMethod } from "@/utils/http";
import { PARKING_LOT_URL } from "..";
import { MutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UpdateParkingLotInput = {
  parkingLotId: string;
  data: ParkingLot;
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
}

export type UpdateParkingLotService = (
  input: UpdateParkingLotInput
) => Promise<ParkingLot>;

export const updateParkingLotService: UpdateParkingLotService = async (input: UpdateParkingLotInput) => {
  const { parkingLotId, data, auth } = input;
  const response = await apiRequest<ParkingLot>(
    PARKING_LOT_URL + `/parkinglot_v1/parkinglot/${parkingLotId}`,
    HTTPMethod.PATCH,
    auth.accessToken,
    auth.authenticate,
    data
  );
  return response;
}

export const useUpdateParkingLot = (
  options?: MutationOptions<
    ParkingLot,
    AxiosError,
    UpdateParkingLotInput,
    unknown
  >
): UseMutationResult<
  ParkingLot,
  AxiosError,
  UpdateParkingLotInput
> => {
  return useMutation({
    mutationFn: updateParkingLotService,
    retry: 0,
    ...options,
  });
};
