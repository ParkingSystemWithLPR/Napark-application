import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { PAYMENT_URL } from "..";

import { QRcode } from "@/types/payment";
import apiRequest, { HTTPMethod } from "@/utils/http";

export type GetTopUpQRcodeInput = {
  body: {
    amount: number;
  };
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
};

type GetTopUpQRcodeService = (input: GetTopUpQRcodeInput) => Promise<QRcode>;

export const getTopUpQRcode: GetTopUpQRcodeService = async ({ body, auth }) => {
  const data = await apiRequest<QRcode>(
    PAYMENT_URL + "/payment_v1/payment/topup",
    HTTPMethod.POST,
    auth.accessToken,
    auth.authenticate,
    body
  );
  return data;
};

export const useGetTopUpQRcode = (
  options?: MutationOptions<QRcode, AxiosError, GetTopUpQRcodeInput>
): UseMutationResult<QRcode, AxiosError, GetTopUpQRcodeInput> =>
  useMutation({
    mutationFn: getTopUpQRcode,
    retry: 0,
    ...options,
  });
