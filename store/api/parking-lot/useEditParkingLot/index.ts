import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { PARKING_LOT_URL } from "..";

import { ParkingLot } from "@/types/parking-lot";
import apiRequest, { HTTPMethod } from "@/utils/http";

export interface EditParkingLotInput {
  queryParams: {
    parkingLotId: string;
    editParams: object;
  };
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
}

type EditParkingLotService = (
  input: EditParkingLotInput
) => Promise<ParkingLot>;

export const editParkingLot: EditParkingLotService = async ({
  queryParams,
  auth,
}) => {
  const data = await apiRequest<ParkingLot>(
    PARKING_LOT_URL + `/parkinglot_v1/parkinglot/${queryParams.parkingLotId}`,
    HTTPMethod.PATCH,
    auth.accessToken,
    auth.authenticate,
    queryParams.editParams
  );
  return data;
};

export const useEditParkingLot = (
  input?: MutationOptions<ParkingLot, AxiosError, EditParkingLotInput>
): UseMutationResult<ParkingLot, AxiosError, EditParkingLotInput> =>
  useMutation({
    mutationFn: editParkingLot,
    retry: 0,
    ...input,
  });

export default useEditParkingLot;
