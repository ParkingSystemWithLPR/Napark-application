import {
  MutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { PAYMENT_URL } from "..";

import apiRequest, { HTTPMethod } from "@/utils/http";

export interface ConfirmTransactionInput {
  queryParams: {
    transactionId: string;
  };
  auth: {
    accessToken: string;
    authenticate: (accessToken: string, refreshToken: string) => void;
  };
}

type ConfirmTransactionService = (
  input: ConfirmTransactionInput
) => Promise<void>;

export const confirmTransaction: ConfirmTransactionService = async ({
  queryParams,
  auth,
}) => {
  await apiRequest<void>(
    PAYMENT_URL +
      `/payment_v1/payment/transaction/${queryParams.transactionId}`,
    HTTPMethod.PUT,
    auth.accessToken,
    auth.authenticate
  );
};

export const useConfirmTransaction = (
  input?: MutationOptions<void, AxiosError, ConfirmTransactionInput>
): UseMutationResult<void, AxiosError, ConfirmTransactionInput> =>
  useMutation({
    mutationFn: confirmTransaction,
    retry: 0,
    ...input,
  });
