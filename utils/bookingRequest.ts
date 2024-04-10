import {
  formatTimeWithSecond,
  getDateFromDateAndTime,
  isCheckInTimeout,
  isCheckOutTimeout,
} from "./date";
import { ValidateStatus } from "@/enum/BookingValidateStatus";
import { ParkingLot } from "@/types/parking-lot/ParkingLot";
import { GetAvailableSlotsQueryParam } from "@/store/api/booking/useGetAvailableSlot";
import { CreateBookingRequest, Slot } from "@/types/booking/Booking";
import { BookingDetailState } from "@/screens/bookings/booking/BookingDetail";
import { Profile } from "@/types/user";

export const defaultBookingDetailState: BookingDetailState = {
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

export const createDefaultBookingDetailState = (
  profile: Profile
): BookingDetailState => {
  const defaultLicensePlate = profile.user_cars
    ?.filter((car) => car.is_default)
    .map((defaultcar) => defaultcar._id)[0];
  console.log(defaultLicensePlate);
  return {
    ...defaultBookingDetailState,
    licensePlate: defaultLicensePlate ?? "",
  };
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

export const getQueryParamFromBookingDetailState = (
  bookingDetailState: BookingDetailState,
  parkingLot: ParkingLot
): GetAvailableSlotsQueryParam => {
  const isValidTime =
    validateTimeInputs(bookingDetailState) == ValidateStatus.SUCCESS;
  const isValidLicensePlate =
    validateLicensePlate(bookingDetailState) == ValidateStatus.SUCCESS;
  if (isValidTime && isValidLicensePlate) {
    return {
      parkinglot_id: parkingLot._id,
      start_date: bookingDetailState.checkInDate ?? "",
      start_time: bookingDetailState.checkInTime
        ? formatTimeWithSecond(bookingDetailState.checkInTime)
        : "",
      end_date: bookingDetailState.checkOutDate ?? "",
      end_time: bookingDetailState.checkOutTime
        ? formatTimeWithSecond(bookingDetailState.checkOutTime)
        : "",
      is_for_disabled: bookingDetailState.specification != "None",
    };
  }
  return {
    parkinglot_id: parkingLot._id,
    start_date: null,
    start_time: null,
    end_date: null,
    end_time: null,
    is_for_disabled: false,
  };
};

export const getTotalFloor = (slots: Slot[]) => {
  return [...new Set(slots.map((item) => item.floor))];
};

export const formatCreateBookingRequest = (
  bookingDetailState: BookingDetailState,
  parkingLot: ParkingLot
): CreateBookingRequest => {
  return {
    car_id: bookingDetailState.licensePlate,
    end_date: bookingDetailState.checkOutDate ?? "",
    end_time: bookingDetailState.checkOutTime
      ? formatTimeWithSecond(bookingDetailState.checkOutTime)
      : "",
    start_date: bookingDetailState.checkInDate ?? "",
    start_time: bookingDetailState.checkInTime
      ? formatTimeWithSecond(bookingDetailState.checkInTime)
      : "",
    parkinglot_id: parkingLot._id,
    slot_id: bookingDetailState.slotId,
  };
};
