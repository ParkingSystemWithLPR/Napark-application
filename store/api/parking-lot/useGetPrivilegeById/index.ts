import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { PARKING_LOT_URL } from "..";

import { ParkingPrivilegeProfile } from "@/types/parking-lot";
import apiRequest, { HTTPMethod } from "@/utils/http";

type GetPrivilegeInput = {
  queryParams: {
    parkingLotId: string;
  };
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
};

type GetPrivilegeService = (
  input: GetPrivilegeInput
) => Promise<ParkingPrivilegeProfile[]>;

export const getPrivilegeByParkingLotId: GetPrivilegeService = async ({
  queryParams,
  auth,
}) => {
  const data = await apiRequest<ParkingPrivilegeProfile[]>(
    PARKING_LOT_URL +
      `/parkinglot_v1/parkinglot/${queryParams.parkingLotId}/privileges`,
    HTTPMethod.GET,
    auth.accessToken,
    auth.authenticate
  );
  return data;
};

export const usePrivilege = (
  input: GetPrivilegeInput
): UseQueryResult<ParkingPrivilegeProfile[], AxiosError> => {
  return useQuery({
    queryKey: ["privilege", input.queryParams],
    queryFn: async () => getPrivilegeByParkingLotId(input),
    refetchOnWindowFocus: false,
    refetchInterval: 0,
  });
};
