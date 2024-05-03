import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { PAYMENT_URL } from "..";

import { QRCode } from "@/types/payment";
import apiRequest, { HTTPMethod } from "@/utils/http";

export type GetTopUpQRCodeInput = {
  body: {
    amount: number;
  };
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
};

type GetTopUpQRCodeService = (input: GetTopUpQRCodeInput) => Promise<QRCode>;

export const getTopUpQRCode: GetTopUpQRCodeService = async ({ body, auth }) => {
  const data = await apiRequest<QRCode>(
    PAYMENT_URL + "/payment_v1/payment/topup",
    HTTPMethod.POST,
    auth.accessToken,
    auth.authenticate,
    body
  );
  return data;
};

export const useGetTopUpQRCode = (
  options?: MutationOptions<QRCode, AxiosError, GetTopUpQRCodeInput>
): UseMutationResult<QRCode, AxiosError, GetTopUpQRCodeInput> =>
  useMutation({
    mutationFn: getTopUpQRCode,
    retry: 0,
    ...options,
  });
