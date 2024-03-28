import { useLayoutEffect, useState } from "react";
import { Image, View, StyleSheet, Alert } from "react-native";

import PrimaryButton from "../button/PrimaryButton";
import SecondaryButton from "../button/SecondaryButton";
import DropdownInput, { DropdownItem } from "../input/DropdownInput";
import BodyText from "../text/BodyText";

export type ParkingPlanProps = {
  floor: string;
  setFloor: (data: string) => void;
  slot: string;
  setSlot: (data: string) => void;
  setPrice: (data: number) => void;
  setUnit: (data: string) => void;
  handleConfirm: () => void;
};

const ParkingPlan: React.FC<ParkingPlanProps> = ({
  floor,
  setFloor,
  slot,
  setSlot,
  setPrice,
  setUnit,
  handleConfirm,
}) => {
  const [isFirstUpdate, setIsFirstUpdate] = useState(true);
  const [canClickConfirm, setCanClickConfirm] = useState(false);
  useLayoutEffect(() => {
    if (!isFirstUpdate && floor != "") {
      setSlot("");
    } else {
      setIsFirstUpdate(false);
    }
  }, [floor]);

  useLayoutEffect(() => {
    if (floor != "" && slot != "") {
      setCanClickConfirm(true);
    } else {
      setCanClickConfirm(false);
    }
  }, [floor, slot]);

  const renderItem = (item: DropdownItem) => {
    return (
      <View style={styles.item}>
        <BodyText text={item.value} />
        <BodyText
          text={`${item.price && item.price.toString()} ${item.unit}`}
        />
      </View>
    );
  };

  const onSpecialSelect = (item: DropdownItem) => {
    setPrice(item.price ?? 0);
    setSlot(item.value);
    setUnit(item.unit ?? "");
  };

  const unableToConfirmHandler = () => {
    Alert.alert("Please select a slot");
  };
  return (
    <View style={styles.container}>
      <DropdownInput
        items={[
          { label: "floor1", value: "url1" },
          { label: "floor2", value: "url2" },
        ]}
        selectedValue={floor}
        onSelect={setFloor}
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
              { label: "a1", value: "a1", price: 25, unit: "baht/hr" },
              { label: "a2", value: "a2", price: 25, unit: "baht/hr" },
            ]}
            selectedValue={slot}
            onSelect={setSlot}
            placeholder={"Select Slot"}
            renderItem={renderItem}
            onSpecialSelect={onSpecialSelect}
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
