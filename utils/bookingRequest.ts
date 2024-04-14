import {
  formatTimeWithSecond,
  getDateFromDateAndTime,
  isCheckInTimeout,
  isCheckOutTimeout,
} from "./date";

import { ValidateStatus } from "@/enum/BookingValidateStatus";
import { SlotType } from "@/enum/SlotType";
import { BookingDetailState } from "@/screens/bookings/booking/BookingDetail";
import { GetAvailableSlotsQueryParam } from "@/store/api/booking/useGetAvailableSlot";
import {
  Booking,
  CreateBookingRequest,
  FloorProfile,
  SlotProfile,
  SlotProfileWithPrivilege,
} from "@/types/booking";
import { ParkingLot } from "@/types/parking-lot";
import { Profile } from "@/types/user";

export const defaultBookingDetailState: BookingDetailState = {
  carId: "",
  checkInDate: null,
  checkInTime: null,
  checkOutDate: null,
  checkOutTime: null,
  specification: SlotType.Normal,
  floor: null,
  slotId: "",
  slotName: "",
  price: -1,
  unit: "",
};

export const createDefaultBookingDetailState = (
  profile: Profile
): BookingDetailState => {
  const defaultLicensePlate = profile.cars
    ?.filter((car) => car._id == profile.default_car_id)
    .map((defaultcar) => defaultcar._id)[0];
  return {
    ...defaultBookingDetailState,
    carId: defaultLicensePlate ?? "",
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
  const { carId } = bookingRequest;
  return carId != defaultBookingDetailState.carId
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
      slot_type: bookingDetailState.specification,
    };
  }
  return {
    parkinglot_id: parkingLot._id,
    start_date: null,
    start_time: null,
    end_date: null,
    end_time: null,
    slot_type: SlotType.Normal,
  };
};

export const getTotalFloor = (slots: FloorProfile[]) => {
  return slots.map((item) => item.floor);
};

export const getSpecificationList = (slots: SlotProfile[]) => {
  return slots.map((item) => item.type); //ยังไม่มีอันไหนที่ใช้ได้ตรงๆอะเลยต้อง อ้อมๆแบบนี้ไปก่อน
};

export const formatCreateBookingRequest = (
  bookingDetailState: BookingDetailState,
  parkingLot: ParkingLot
): CreateBookingRequest => {
  return {
    car_id: bookingDetailState.carId,
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

export const formatDefaultBookingValue = (
  booking: Booking
): BookingDetailState => {
  return { ...defaultBookingDetailState, carId: booking.car_id };
};
