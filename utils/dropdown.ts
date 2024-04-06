import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

import { ParkingValue } from "@/components/booking/ParkingPlan";
import { DropdownItem } from "@/components/input/DropdownInput";
import { FloorProfile, SlotProfileWithPrivilege } from "@/types/booking";
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
  floorList: FloorProfile[]
): DropdownItem<ParkingValue>[] => {
  return floorList.flatMap((floor) => {
    return floor.zones.flatMap((zone) => {
      return zone.slots.flatMap((slot) => {
        return {
          label: slot.name,
          value: {
            slotId: slot._id,
            price: slot.is_privilege_available
              ? slot.privilege_price_rate
              : slot.default_price_rate,
            slotName: slot.name,
            unit: slot.is_privilege_available
              ? slot.privilege_price_unit
              : slot.default_price_rate_unit,
          },
        };
      });
    });
  });
};

export const formatEnumtoDropdownItem = (
  enums: object
): DropdownItem<object>[] => {
  return Object.values(enums).map((value) => {
    return { label: value, value: value };
  });
};

export const formatEnumtoDropdownItem = (enums: object): DropdownItem[] => {
  return Object.values(enums).map((value) => {
    return { label: value, value: value };
  })
};
