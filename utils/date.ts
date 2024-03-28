import { format, parseISO } from "date-fns";
import { getFormatedDate } from "react-native-modern-datepicker";

import { DayInAWeek } from "@/enum/DayInAWeek";
import { BusinessDay } from "@/types/parking-lot/ParkingLot";

export const MINIMUM_DATE = new Date(1900, 1, 1);

export const formatDate = (date: Date) => {
  return getFormatedDate(date, "YYYY-MM-DD");
};
export const formatHumanReadableDateFromDateString = (date: string) => {
  const dateObject = parseISO(date);
  return format(dateObject, "d MMMM yyyy");
};
export const formatDateAndTime = (date: Date) => {
  return {
    date: getFormatedDate(date, "YYYY-MM-DD"),
    time: getFormatedDate(date, "h:m"),
  };
};

export const formatTime = (date: Date) => {
  return getFormatedDate(date, "HH:mm");
};
export const formatStringDate = (date: string) => {
  return date.replaceAll("/", "-");
};

const validateDate = (date: string): boolean => {
  return MINIMUM_DATE < new Date(date);
};

export const formatISODate = (date?: string) => {
  return date && validateDate(date) ? date.split("T")[0] : "";
};

export const getBusinessHours = (businessDays: BusinessDay) => {
  const today = format(new Date(), "eeee");
  return `${businessDays[`${today}` as DayInAWeek].openTime} - ${businessDays[`${today}` as DayInAWeek].closeTime}`
}
