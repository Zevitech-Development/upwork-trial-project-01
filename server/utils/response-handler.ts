import { ApiResponseInterface } from "../interfaces/utils-interface";

export const SuccessResponseHandler = <T>(
  data: T,
  message: string = "Success"
): ApiResponseInterface<T> => ({
  success: true,
  message,
  data,
});

export const ErrorResponseHandler = (
  message: string,
  error?: string
): ApiResponseInterface => ({
  success: false,
  message,
  error,
});
