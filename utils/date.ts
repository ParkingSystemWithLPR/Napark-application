import { differenceInMinutes, format, isBefore, parseISO } from "date-fns";
import { getFormatedDate } from "react-native-modern-datepicker";

import { DayInAWeek } from "@/enum/DayInAWeek";
import { BusinessDay } from "@/types/parking-lot";

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

export const formatTimeWithSecond = (timeString: string) => {
  return `${timeString}:00`;
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
  return `${businessDays[`${today}` as DayInAWeek].openTime} - ${
    businessDays[`${today}` as DayInAWeek].closeTime
  }`;
};

export const isCheckInTimeout = (date: Date) => {
  return isBefore(date, new Date());
};

export const isCheckOutTimeout = (date: Date) => {
  return isBefore(date, new Date());
};

export const getOpenCloseTime = (
  dateString: string,
  businessDays: BusinessDay
) => {
  const dateObject = parseISO(dateString);
  const day = format(dateObject, "eeee");
  const bussinessDay = businessDays[`${day}` as DayInAWeek];
  if (bussinessDay) {
    return {
      openTime: bussinessDay.openTime,
      closeTime: bussinessDay.closeTime,
    };
  }
};

export const disableDate = (businessDays: BusinessDay, date: Date) => {
  const day = format(date, "eeee");
  return businessDays[`${day}` as DayInAWeek] === undefined;
};

export const duration = (minTime: Date, maxTime: Date): string => {
  return `open ${formatTime(minTime)} - ${formatTime(maxTime)}`;
};

export const getDateFromDateAndTime = (date: string, time?: string) => {
  return parseISO(`${date} ${time}`.trimEnd());
};

type TmpNewBusinessDay = {
  weekday: string;
  open_time: string;
  close_time: string;
};

type NewBussinessDays = TmpNewBusinessDay[];

export const newDisableDate = (bussinessDays: NewBussinessDays, date: Date) => {
  const day = format(date, "eeee").toLowerCase();
  return (
    bussinessDays.filter((bussinessDay) => bussinessDay.weekday == day)
      .length == 0
  );
};

export const newGetOpenCloseTime = (
  dateString: string,
  businessDays: NewBussinessDays
) => {
  const dateObject = parseISO(dateString);
  const day = format(dateObject, "eeee").toLowerCase();
  const bussinessDay = businessDays.filter(
    (businessDay) => businessDay.weekday == day
  );
  if (bussinessDay.length != 0) {
    return {
      openTime: bussinessDay[0].open_time,
      closeTime: bussinessDay[0].close_time,
    };
  }
};
