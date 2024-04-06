import { DropdownItem } from "@/components/input/DropdownInput";

export const formatDropdownFromLicensePlates = (
  licensePlates: string[]
): DropdownItem[] => {
  return licensePlates.flatMap((licensePlate) => {
    return { label: licensePlate, value: licensePlate };
  });
};

export const formatEnumtoDropdownItem = (enums: object): DropdownItem[] => {
  return Object.values(enums).map((value) => {
    return { label: value, value: value };
  })
};
