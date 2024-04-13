import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { RadioButtonProps, RadioGroup } from "react-native-radio-buttons-group";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import SubHeaderText from "../text/SubHeaderText";

import { SlotType } from "@/enum/SlotType";
import { formatToSentenceCase } from "@/utils/text";

export type SpecificationProps = {
  specification: string | undefined;
  onChange: (id: string | undefined) => void;
};

const Specification: React.FC<SpecificationProps> = ({
  specification,
  onChange,
}) => {
  const radioButtons: RadioButtonProps[] = useMemo(
    () =>
      Object.values(SlotType).map((value) => {
        return {
          id: value,
          label: formatToSentenceCase(value),
          color: Colors.red[400].toString(),
        };
      }),
    []
  );

  return (
    <>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <MaterialCommunityIcons name="alpha-p-circle-outline" size={20} />
            <SubHeaderText
              text={"Specification"}
              containerStyle={styles.header}
            />
          </View>
        </View>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={onChange}
          selectedId={specification}
          containerStyle={styles.radioButton}
        />
      </View>
    </>
  );
};
export default Specification;

const styles = StyleSheet.create({
  outerContainer: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: Colors.white,
    paddingHorizontal: 8,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.red[400],
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  parkingOutline: { borderRadius: 20, borderWidth: 1, alignItems: "center" },
  header: { marginLeft: 5 },
  radioButton: {
    alignItems: "flex-start",
    marginVertical: 10,
  },
});
