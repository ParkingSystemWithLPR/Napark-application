import { DropdownItem } from "@/components/input/DropdownInput";
import { Car } from "@/types/user";

export const initDropdownValue = <T>(
  label: string,
  value: T
): DropdownItem<T> => {
  return { label: label, value: value };
};

export const formatDropdownFromLicensePlates = (
  licensePlates: Car[]
): DropdownItem<string>[] => {
  return licensePlates.flatMap((licensePlate) => {
    return {
      label: licensePlate.license_plate,
      value: licensePlate.license_plate,
    };
  });
};
