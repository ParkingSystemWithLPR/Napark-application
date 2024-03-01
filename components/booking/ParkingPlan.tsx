import { Image, View, StyleSheet } from "react-native";

import SecondaryButton from "../button/SecondaryButton";
import DropdownInput from "../input/DropdownInput";

export type ParkingPlanProps = {
  floor: string;
  setFloor: (data: string) => void;
  slot: string;
  setSlot: (data: string) => void;
  handleConfirm: () => void;
};

const ParkingPlan: React.FC<ParkingPlanProps> = ({
  floor,
  setFloor,
  slot,
  setSlot,
  handleConfirm,
}) => {
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
              { label: "slot1", value: "a1" },
              { label: "slot2", value: "a2" },
            ]}
            selectedValue={slot}
            onSelect={setSlot}
            placeholder={"Select Slot"}
          />
          <SecondaryButton
            title={"confirm"}
            onPress={handleConfirm}
            buttonStyle={styles.buttonStyle}
            outerContainerStyle={styles.centerContainer}
          />
        </View>
      )}
    </View>
  );
};
export default ParkingPlan;

const styles = StyleSheet.create({
  container: { gap: 10 },
  buttonStyle: {
    paddingHorizontal: 50,
  },
  centerContainer: { alignSelf: "center" },
});
