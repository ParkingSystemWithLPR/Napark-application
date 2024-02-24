import { getFormatedDate } from "react-native-modern-datepicker";
export const formatDate = (date: Date) => {
  return getFormatedDate(date, "YYYY-MM-DD");
};

export const formatStringDate = (date: string) => {
  return date.replaceAll("/", "-");
};

const validateDate = (date: string): boolean => {
  return new Date(1900, 1, 1) < new Date(date);
};

export const formatISODate = (date: string) => {
  return validateDate(date) ? date.split("T")[0] : "";
};
