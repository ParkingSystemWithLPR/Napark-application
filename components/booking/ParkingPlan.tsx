import { useLayoutEffect, useState } from "react";
import { Image, View, StyleSheet, Alert } from "react-native";

import PrimaryButton from "../button/PrimaryButton";
import SecondaryButton from "../button/SecondaryButton";
import DropdownInput, { DropdownItem } from "../input/DropdownInput";
import BodyText from "../text/BodyText";
import { initDropdownValue } from "@/utils/dropdown";
import { BookingDetailState } from "@/screens/booking/BookingDetail";
import { defaultBookingDetailState } from "@/utils/bookingRequest";

export type ParkingPlanProps = {
  bookingDetailState: BookingDetailState;
  onChange: <T>(identifierKey: string, enteredValue: T) => void;
  handleConfirm: () => void;
};
type ParkingValue = {
  slotId: string;
  slotName: string;
  price: number;
  unit: string;
};
const ParkingPlan: React.FC<ParkingPlanProps> = ({
  bookingDetailState,
  onChange,
  handleConfirm,
}) => {
  const { floor, slotId, slotName, price, unit } = bookingDetailState;
  const [isFirstUpdate, setIsFirstUpdate] = useState(true);
  const [canClickConfirm, setCanClickConfirm] = useState(false);
  const [parkingValue, SetParkingValue] = useState<DropdownItem<ParkingValue>>(
    initDropdownValue<ParkingValue>(slotName, {
      slotId: slotId,
      slotName: slotName,
      price: price,
      unit: unit,
    })
  );
  const [dropDownFloor, SetDropDownFloor] = useState<DropdownItem<number>>(
    initDropdownValue<number>(`floor${floor}`, floor)
  );
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
    if (!isFirstUpdate && floor != -1) {
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
    } else {
      setIsFirstUpdate(false);
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
        items={[
          { label: "floor1", value: 1 },
          { label: "floor2", value: 2 },
        ]}
        selectedValue={dropDownFloor}
        onSpecialSelect={(item) => {
          setFloor(item.value);
          SetDropDownFloor(item);
        }}
        placeholder={"Select floor"}
      />
      {floor && (
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.centerContainer}
          />
          <DropdownInput
            items={[
              {
                label: "a1",
                value: {
                  slotId: "1",
                  slotName: "a1",
                  price: 25,
                  unit: "baht/hr",
                },
              },
              {
                label: "a2",
                value: {
                  slotId: "2",
                  slotName: "a2",
                  price: 25,
                  unit: "baht/hr",
                },
              },
            ]}
            selectedValue={parkingValue}
            onSpecialSelect={(item) => {
              onSelect(item.value);
              SetParkingValue(item);
            }}
            placeholder={"Select Slot"}
            renderItem={renderItem}
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
