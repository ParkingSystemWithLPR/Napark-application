import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import PrimaryButton from "../../components/button/PrimaryButton";
import SecondaryButton from "../../components/button/SecondaryButton";
import CheckboxInput from "../../components/input/CheckBoxInput";
import TextInput from "../../components/input/TextInput";
import BodyContainer from "../../components/ui/BodyContainer";
import { ActionMode } from "../../enum/ActionMode";
import { RootParamList } from "../../types";

export type CarInfoSetupProps = NativeStackScreenProps<
  RootParamList,
  "CarInfoSetup"
>;

const CarInfoSetup: React.FC<CarInfoSetupProps> = ({ navigation, route }) => {
  const { mode } = route.params;
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [isDefault, setDefault] = useState<boolean>(false);

  const onPressAction = () => {};

  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <TextInput
        title="License Plate Number"
        placeholder="Enter your license plate"
        value={licensePlate}
        onChangeText={setLicensePlate}
      />
      <TextInput
        title="Province of registration"
        placeholder="Choose province of registration"
        value={province}
        onChangeText={setProvince}
      />
      <CheckboxInput
        text="Set as default"
        onPress={() => setDefault((cur) => !cur)}
        isChecked={isDefault}
      />
      <View style={styles.buttonContainer}>
        <SecondaryButton title="Cancel" onPress={() => navigation.goBack()} />
        <PrimaryButton
          title={mode === ActionMode.CREATE ? "Create" : "Save"}
          onPress={onPressAction}
        />
      </View>
    </BodyContainer>
  );
};

export default CarInfoSetup;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },
});
