import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import CheckboxInput from "@/components/input/CheckBoxInput";
import DropdownInput from "@/components/input/DropdownInput";
import TextInput, { InputValueType } from "@/components/input/TextInput";
import BodyContainer from "@/components/ui/BodyContainer";
import { THAI_PROVINCE } from "@/constants/province";
import { ActionMode } from "@/enum/ActionMode";
import { useCreateUserCar } from "@/store/api/user/useCreateUserCar";
import { useEditUserCar } from "@/store/api/user/useEditUserCar";
import { useAuth } from "@/store/context/auth";
import { useProfile } from "@/store/context/profile";
import { OtherStackParamList, AuthenticatedStackParamList } from "@/types";

export type CarInfoSetupProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "CarInfoSetup">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const CarInfoSetup: React.FC<CarInfoSetupProps> = ({ navigation, route }) => {
  const { mode, carInfo } = route.params;
  const { accessToken, authenticate } = useAuth();
  const { profile, setProfile } = useProfile();
  const [licensePlate, setLicensePlate] = useState<InputValueType>({
    value: "",
  });
  const [province, setProvince] = useState<InputValueType>({
    value: "",
  });
  const [isDefault, setDefault] = useState<boolean>(false);

  const { mutateAsync: createUserCar } = useCreateUserCar();
  const { mutateAsync: editUserCar } = useEditUserCar();

  const onPressAction = async () => {
    const licensePlateRegex = /^[0-9]?[ก-๙]+\s[0-9]{1,4}$/;
    let isLicensePlateValid = false;
    let isProvinceSelected = false;
    let isValid;
    switch (mode) {
      case ActionMode.CREATE:
        isLicensePlateValid = licensePlateRegex.test(licensePlate.value);
        isProvinceSelected = province.value.length > 0;
        isValid = isLicensePlateValid && isProvinceSelected;
        if (isValid) {
          await createUserCar(
            {
              body: {
                license_plate: licensePlate.value,
                province_of_reg: province.value,
                is_default: isDefault,
              },
              auth: {
                accessToken,
                authenticate,
              },
            },
            {
              onSuccess(data) {
                setProfile(data);
                navigation.goBack();
              },
            }
          );
        } else {
          setLicensePlate((curLicensePlate: InputValueType) => {
            return {
              ...curLicensePlate,
              errorText: isLicensePlateValid
                ? undefined
                : "Invalid license plate",
            };
          });
          setProvince((curProvince: InputValueType) => {
            return {
              ...curProvince,
              errorText: isProvinceSelected
                ? undefined
                : "Please select the province before submitting",
            };
          });
        }
        break;
      case ActionMode.EDIT:
        if (carInfo?._id) {
          await editUserCar(
            {
              body: {
                car_id: carInfo._id,
              },
              auth: {
                accessToken,
                authenticate,
              },
            },
            {
              onSuccess(data) {
                setProfile(data);
                navigation.goBack();
              },
            }
          );
        }
        break;
    }
  };

  useLayoutEffect(() => {
    if (mode === ActionMode.EDIT) {
      if (carInfo) {
        setLicensePlate({ value: carInfo.license_plate });
        setProvince({ value: carInfo.province_of_reg });
        setDefault(carInfo._id === profile.default_car_id);
      } else {
        Alert.alert("Something wrong!");
        navigation.goBack();
      }
    }
  }, [carInfo]);

  const handleOnChange = (
    setState: (input: InputValueType) => void,
    enteredValue: string
  ) => {
    setState({ value: enteredValue });
  };

  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <TextInput
        title="License Plate Number"
        placeholder="Enter your license plate"
        value={licensePlate.value}
        onChangeText={handleOnChange.bind(this, setLicensePlate)}
        isRequired={mode === ActionMode.CREATE}
        errorText={licensePlate.errorText}
        editable={mode === ActionMode.CREATE}
      />
      <DropdownInput
        title="Province of registration"
        placeholder="Choose province of registration"
        selectedValue={province.value}
        onSelect={handleOnChange.bind(this, setProvince)}
        items={THAI_PROVINCE}
        withSearch
        isRequired={mode === ActionMode.CREATE}
        editable={mode === ActionMode.CREATE}
        errorText={province.errorText}
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
