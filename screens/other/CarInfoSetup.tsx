import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import CheckboxInput from "@/components/input/CheckBoxInput";
import DropdownInput from "@/components/input/DropdownInput";
import TextInput from "@/components/input/TextInput";
import BodyContainer from "@/components/ui/BodyContainer";
import { THAI_PROVINCE } from "@/constants/province";
import { ActionMode } from "@/enum/ActionMode";
import { RootParamList } from "@/types";

export type CarInfoSetupProps = NativeStackScreenProps<
  RootParamList,
  "CarInfoSetup"
>;

const CarInfoSetup: React.FC<CarInfoSetupProps> = ({ navigation, route }) => {
  const { mode, carInfo } = route.params;
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [isDefault, setDefault] = useState<boolean>(false);

  const onPressAction = () => {};

  useLayoutEffect(() => {
    if (mode === ActionMode.EDIT) {
      if (carInfo) {
        setLicensePlate(carInfo.license_plate);
        setProvince(carInfo.province_of_reg);
        setDefault(carInfo.is_default);
      } else {
        Alert.alert("Something wrong!");
        navigation.goBack();
      }
    }
  }, [carInfo]);

  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <TextInput
        title="License Plate Number"
        placeholder="Enter your license plate"
        value={licensePlate}
        onChangeText={setLicensePlate}
        isRequired={mode === ActionMode.EDIT}
      />
      <DropdownInput
        title="Province of registration"
        placeholder="Choose province of registration"
        selectedValue={province}
        onSelect={setProvince}
        items={THAI_PROVINCE}
        withSearch
        isRequired={mode === ActionMode.EDIT}
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
