import { differenceInMinutes, format, isBefore, parseISO } from "date-fns";
import { getFormatedDate } from "react-native-modern-datepicker";

import { formatToSentenceCase } from "./text";

import { DayInAWeek } from "@/enum/DayInAWeek";
import { BusinessDay, BusinessHour } from "@/types/parking-lot";

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
  const hourWithSecond = timeString.split(":").slice(0, 2).join(":");
  return `${hourWithSecond}:00`;
};

export const formatDisplayTime = (timeString: string) => {
  return timeString.split(":").slice(0, 2).join(":");
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

export const getBusinessHours = (business_day: BusinessDay) => {
  return `${business_day.open_time} - ${business_day.close_time}`;
};

export const isCheckInTimeout = (date: Date) => {
  return isBefore(date, new Date());
};

export const isCheckOutTimeout = (date: Date) => {
  return isBefore(date, new Date());
};

export const duration = (minTime: Date, maxTime: Date): string => {
  return `${formatTime(minTime)} - ${formatTime(maxTime)}`;
};

export const getDateFromDateAndTime = (date: string, time?: string) => {
  return parseISO(`${date} ${time}`.trimEnd());
};

export const getDateFromTime = (time: string = "") => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, seconds || 0, 0);
  return date;
};

export const getDayInAWeek = (date: Date): DayInAWeek => {
  const day = format(date, "eeee").toUpperCase();
  return DayInAWeek[day as keyof typeof DayInAWeek];
};

export const disableDate = (bussinessDays: BusinessDay[], date: Date) => {
  const day = format(date, "eeee").toLowerCase();
  return (
    bussinessDays.find((bussinessDay) => bussinessDay.weekday == day) ==
    undefined
  );
};

export const getOpenCloseTime = (
  dateString: string,
  businessDays: BusinessDay[]
) => {
  const dateObject = parseISO(dateString);
  const day = format(dateObject, "eeee").toLowerCase();
  const bussinessDay = businessDays.filter(
    (businessDay) => businessDay.weekday == day
  );
  if (bussinessDay.length != 0) {
    return {
      open_time: bussinessDay[0].open_time,
      close_time: bussinessDay[0].close_time,
    };
  }
};

export const isEqualBusinessHour = (a: BusinessHour, b: BusinessHour) => {
  return a.open_time === b.open_time && a.close_time === b.close_time;
};

export const formatDayRange = (days: DayInAWeek[]): string => {
  if (days.length === 7) return "everyday";
  const dayInaWeek = [
    ...Object.values(DayInAWeek).slice(1),
    Object.values(DayInAWeek)[0],
    "freeday",
  ];
  let result = "";
  days.sort((a, b) => {
    return (
      dayInaWeek.indexOf(a as DayInAWeek) - dayInaWeek.indexOf(b as DayInAWeek)
    );
  });
  let startDay = "";
  let lastDay = "";
  dayInaWeek.forEach((day) => {
    if (days.includes(day as DayInAWeek)) {
      if (!startDay) startDay = day;
      lastDay = day;
    } else if (startDay) {
      if (startDay === lastDay) {
        result += `${formatToSentenceCase(startDay)}, `;
      } else {
        result += `${formatToSentenceCase(startDay)} - ${formatToSentenceCase(
          lastDay
        )}, `;
      }
      startDay = "";
    }
  });

  return result.slice(0, -2);
};
