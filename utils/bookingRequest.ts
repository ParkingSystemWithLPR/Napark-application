import { BookingRequest } from "@/screens/booking/BookingDetail";
import {
  getDateFromDateAndTime,
  isCheckInTimeout,
  isCheckOutTimeout,
} from "./date";
import { ValidateStatus } from "@/enum/BookingValidateStatus";

export const defaultBookingRequest = {
  licensePlate: "",
  checkInDate: null,
  checkInTime: null,
  checkOutDate: null,
  checkOutTime: null,
  specification: "None",
  floor: "",
  slot: "",
  price: -1,
  unit: "",
};

export const validateTimeInputs = (bookingRequest: BookingRequest) => {
  if (
    bookingRequest.checkInDate &&
    bookingRequest.checkInTime &&
    bookingRequest.checkOutTime &&
    bookingRequest.checkOutDate
  ) {
    if (
      isCheckInTimeout(
        getDateFromDateAndTime(
          bookingRequest.checkInDate,
          bookingRequest.checkInTime
        )
      ) ||
      isCheckOutTimeout(
        getDateFromDateAndTime(
          bookingRequest.checkOutDate,
          bookingRequest.checkOutTime
        )
      )
    ) {
      return ValidateStatus.TIMEOUT;
    }
    return ValidateStatus.SUCCESS;
  }
  return ValidateStatus.MISSING;
};

export const validateLicensePlate = (bookingRequest: BookingRequest) => {
  return bookingRequest.licensePlate != defaultBookingRequest.licensePlate
    ? ValidateStatus.SUCCESS
    : ValidateStatus.MISSING;
};

export const validateAfterClosingSetting = (bookingRequest: BookingRequest) => {
  if (
    bookingRequest.price == defaultBookingRequest.price ||
    bookingRequest.slot == defaultBookingRequest.slot ||
    bookingRequest.unit == defaultBookingRequest.unit
  ) {
    return ValidateStatus.MISSING;
  }
  return ValidateStatus.SUCCESS;
};
