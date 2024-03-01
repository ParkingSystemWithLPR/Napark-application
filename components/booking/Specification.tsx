import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { RadioButtonProps, RadioGroup } from "react-native-radio-buttons-group";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import SubHeaderText from "../text/SubHeaderText";
export type SpecificationProps = {
  selectedId: string | undefined;
  onChange: (id: string | undefined) => void;
};
const Specification: React.FC<SpecificationProps> = ({
  selectedId,
  onChange,
}) => {
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "Disable Parking", // acts as primary key, should be unique and non-empty string
        label: "Disable Parking",
      },
      {
        id: "Ladies Parking",
        label: "Ladies Parking",
      },
      {
        id: "Bus Parking",
        label: "Bus Parking",
      },
      {
        id: "None",
        label: "None",
      },
    ],
    []
  );

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.parkingOutline}>
            <MaterialCommunityIcons name="parking" style={styles.text} />
          </View>
          <SubHeaderText
            text={"Specification"}
            containerStyle={styles.header}
          />
        </View>
      </View>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={onChange}
        selectedId={selectedId}
        containerStyle={styles.radioButton}
      />
    </View>
  );
};
export default Specification;

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: 8,
    borderRadius: 12,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  parkingOutline: { borderRadius: 20, borderWidth: 1, alignItems: "center" },
  text: { fontSize: 20 },
  header: { marginLeft: 5 },
  radioButton: { alignItems: "flex-start", marginVertical: 10 },
});
