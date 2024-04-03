import { BookingDetailState } from "@/screens/booking/BookingDetail";
import {
  getDateFromDateAndTime,
  isCheckInTimeout,
  isCheckOutTimeout,
} from "./date";
import { ValidateStatus } from "@/enum/BookingValidateStatus";

export const defaultBookingDetailState: BookingDetailState = {
  carId: "",
  licensePlate: "",
  checkInDate: null,
  checkInTime: null,
  checkOutDate: null,
  checkOutTime: null,
  specification: "None",
  floor: -1,
  slotId: "",
  slotName: "",
  price: -1,
  unit: "",
};

export const validateTimeInputs = (bookingRequest: BookingDetailState) => {
  const { checkInDate, checkInTime, checkOutTime, checkOutDate } =
    bookingRequest;
  if (checkInDate && checkInTime && checkOutTime && checkOutDate) {
    if (
      isCheckInTimeout(getDateFromDateAndTime(checkInDate, checkInTime)) ||
      isCheckOutTimeout(getDateFromDateAndTime(checkOutDate, checkOutTime))
    ) {
      return ValidateStatus.TIMEOUT;
    }
    return ValidateStatus.SUCCESS;
  }
  return ValidateStatus.MISSING;
};

export const validateLicensePlate = (bookingRequest: BookingDetailState) => {
  const { licensePlate } = bookingRequest;
  return licensePlate != defaultBookingDetailState.licensePlate
    ? ValidateStatus.SUCCESS
    : ValidateStatus.MISSING;
};

export const validateAfterClosingSetting = (
  bookingRequest: BookingDetailState
) => {
  const { slotId } = bookingRequest;
  if (slotId == defaultBookingDetailState.slotId) {
    return ValidateStatus.MISSING;
  }
  return ValidateStatus.SUCCESS;
};
