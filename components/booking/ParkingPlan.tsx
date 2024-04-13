import { useLayoutEffect, useState } from "react";
import { Image, View, StyleSheet, Alert } from "react-native";

import PrimaryButton from "../button/PrimaryButton";
import SecondaryButton from "../button/SecondaryButton";
import DropdownInput, { DropdownItem } from "../input/DropdownInput";
import BodyText from "../text/BodyText";

import { BookingDetailState } from "@/screens/bookings/booking/BookingDetail";
import { SlotProfileWithPrivilege } from "@/types/booking";
import { FloorImage } from "@/types/parking-lot";
import {
  defaultBookingDetailState,
  getTotalFloor,
} from "@/utils/bookingRequest";
import {
  formatDropdownFromFloorList,
  formatDropdownFromSlotList,
  initDropdownValue,
} from "@/utils/dropdown";

export type ParkingPlanProps = {
  bookingDetailState: BookingDetailState;
  availableSlot: SlotProfileWithPrivilege[];
  floorImages: FloorImage[];
  onChange: <T>(identifierKey: string, enteredValue: T) => void;
  handleConfirm: () => void;
};

export type ParkingValue = {
  slotId: string;
  slotName: string;
  price: number;
  unit: string;
};

const IMAGE_SIZE = 200;

const ParkingPlan: React.FC<ParkingPlanProps> = ({
  bookingDetailState,
  availableSlot,
  floorImages,
  onChange,
  handleConfirm,
}) => {
  const { floor, slotId, slotName, price, unit } = bookingDetailState;
  const [canClickConfirm, setCanClickConfirm] = useState(false);
  const floorDropDown = formatDropdownFromFloorList(
    getTotalFloor(availableSlot)
  );
  const [slotInFloor, setSlotInFloor] =
    useState<DropdownItem<ParkingValue>[]>();
  const [parkingValue, SetParkingValue] = useState<DropdownItem<ParkingValue>>(
    initDropdownValue<ParkingValue>(slotName, {
      slotId: slotId,
      slotName: slotName,
      price: price,
      unit: unit,
    })
  );
  const [dropDownFloor, SetDropDownFloor] = useState<DropdownItem<number>>();
  const setFloor = (value: number) => {
    onChange("floor", value);
  };
  const setSlotId = (value: string) => {
    onChange("slotId", value);
  };
  const setSlotName = (value: string) => {
    onChange("slotName", value);
  };
  const setPrice = (value: number) => {
    onChange("price", value);
  };
  const setUnit = (value: string) => {
    onChange("unit", value);
  };
  useLayoutEffect(() => {
    if (floor != -1) {
      const { slotId, slotName, price, unit } = defaultBookingDetailState;
      setSlotId(slotId);
      setSlotName(slotName);
      setPrice(price);
      setUnit(unit);
      SetParkingValue(
        initDropdownValue<ParkingValue>(slotName, {
          slotId: slotId,
          slotName: slotName,
          price: price,
          unit: unit,
        })
      );
      const filteredSlot = availableSlot.filter((slot) => slot.floor == floor);
      setSlotInFloor(formatDropdownFromSlotList(filteredSlot));
    }
  }, [floor]);

  useLayoutEffect(() => {
    if (slotId != "") {
      setCanClickConfirm(true);
    } else {
      setCanClickConfirm(false);
    }
  }, [floor, slotId]);

  const renderItem = (item: DropdownItem<ParkingValue>) => {
    return (
      <View style={styles.item}>
        <BodyText text={item.value.slotName} />
        <BodyText text={`${item.value.price} ${item.value.unit}`} />
      </View>
    );
  };

  const onSelect = (item: ParkingValue) => {
    setSlotId(item.slotId);
    setPrice(item.price);
    setSlotName(item.slotName);
    setUnit(item.unit);
  };

  const unableToConfirmHandler = () => {
    Alert.alert("Please select a slot");
  };

  return (
    <View style={styles.container}>
      <DropdownInput
        items={floorDropDown}
        selectedValue={dropDownFloor}
        onSpecialSelect={(item) => {
          setFloor(item.value);
          SetDropDownFloor(item);
        }}
        placeholder={"Select floor"}
        withSearch
      />
      {floor !== -1 && (
        <View style={styles.container}>
          <Image
            source={{
              uri: floorImages.find((each) => each.floor === floor)?.image,
            }}
            style={styles.centerContainer}
            height={IMAGE_SIZE}
            width={IMAGE_SIZE}
          />
          <DropdownInput
            items={slotInFloor ?? []}
            selectedValue={parkingValue}
            onSpecialSelect={(item) => {
              onSelect(item.value);
              SetParkingValue(item);
            }}
            placeholder={"Select Slot"}
            renderItem={renderItem}
            withSearch
          />
          {canClickConfirm ? (
            <PrimaryButton
              title={"confirm"}
              onPress={handleConfirm}
              buttonStyle={styles.buttonStyle}
              outerContainerStyle={styles.centerContainer}
            />
          ) : (
            <SecondaryButton
              title={"Confirm"}
              onPress={unableToConfirmHandler}
              buttonStyle={styles.buttonStyle}
              outerContainerStyle={styles.centerContainer}
            />
          )}
        </View>
      )}
    </View>
  );
};
export default ParkingPlan;

const styles = StyleSheet.create({
  container: { gap: 10, marginHorizontal: 5 },
  buttonStyle: {
    paddingHorizontal: 50,
  },
  centerContainer: { alignSelf: "center" },
  item: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
