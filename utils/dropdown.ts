import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

import { ParkingValue } from "@/components/booking/ParkingPlan";
import { DropdownItem } from "@/components/input/DropdownInput";
import { Slot } from "@/types/booking";
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
      value: licensePlate._id ?? "",
    };
  });
};

export const formatDropdownFromFloorList = (
  floorList: number[]
): DropdownItem<number>[] => {
  return floorList.flatMap((item) => {
    return {
      label: `floor${item}`,
      value: item,
    };
  });
};

export const formatDropdownFromSlotList = (
  slotList: Slot[]
): DropdownItem<ParkingValue>[] => {
  return slotList.flatMap((item) => {
    return {
      label: item.name,
      value: {
        slotId: item._id,
        price: item.is_privilege_available
          ? item.privilege_price_rate
          : item.default_price_rate,
        slotName: item.name,
        unit: item.is_privilege_available
          ? item.privilege_price_unit
          : item.default_price_rate_unit,
      },
    };
  });
};
