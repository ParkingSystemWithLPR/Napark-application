import { DropdownItem } from "@/components/input/DropdownInput";

export const formatDropdownFromLicensePlates = (
  licensePlates: string[]
): DropdownItem[] => {
  return licensePlates.flatMap((licensePlate) => {
    return { label: licensePlate, value: licensePlate };
  });
};
