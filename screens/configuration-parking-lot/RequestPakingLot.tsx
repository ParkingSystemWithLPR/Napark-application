import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import PrimaryButton from "../../components/button/PrimaryButton";
import TextInput, { InputValueType } from "../../components/input/TextInput";
import BodyContainer from "../../components/ui/BodyContainer";
import { RootParamList } from "../../types";

export type RequestParkingLotProps = NativeStackScreenProps<
  RootParamList,
  "RequestParkingLot"
>;

export type RequestParkingLotInputType = {
  name: InputValueType;
  address: InputValueType;
  subDistict: InputValueType;
  distict: InputValueType;
  province: InputValueType;
  tel: InputValueType;
  zipCode: InputValueType;
};

const RequestParkingLot: React.FC<RequestParkingLotProps> = ({
  navigation,
}) => {
  const [inputValue, setInputValue] = useState<RequestParkingLotInputType>({
    name: { value: "" },
    address: { value: "" },
    subDistict: { value: "" },
    distict: { value: "" },
    province: { value: "" },
    tel: { value: "" },
    zipCode: { value: "" },
  });

  const handleRequestParkingSpacePress = () => {
    navigation.push("ParkingLotsList");
  };

  const handleOnChangeText = (identifierKey: string, enteredValue: string) => {
    setInputValue((curInputValue: RequestParkingLotInputType) => {
      return {
        ...curInputValue,
        [identifierKey]: { value: enteredValue },
      };
    });
  };

  return (
    <BodyContainer>
      <TextInput
        title="Parking Space Name"
        placeholder="Enter your parking space name"
        value={inputValue.name.value}
        onChangeText={handleOnChangeText.bind(this, "name")}
        isRequired
      />
      <TextInput
        title="Address"
        placeholder="Enter your address"
        value={inputValue.address.value}
        onChangeText={handleOnChangeText.bind(this, "address")}
        isRequired
      />
      <TextInput
        title="Sub distict"
        placeholder="Enter your sub distict"
        value={inputValue.subDistict.value}
        onChangeText={handleOnChangeText.bind(this, "subDistict")}
        isRequired
      />
      <TextInput
        title="Distict"
        placeholder="Enter your distict"
        value={inputValue.distict.value}
        onChangeText={handleOnChangeText.bind(this, "distict")}
        isRequired
      />
      <TextInput
        title="Province"
        placeholder="Enter your province"
        value={inputValue.province.value}
        onChangeText={handleOnChangeText.bind(this, "province")}
        isRequired
      />
      <View style={styles.sameLineInputContainer}>
        <TextInput
          title="Zipcode"
          placeholder="Enter your zip-code"
          value={inputValue.zipCode.value}
          onChangeText={handleOnChangeText.bind(this, "zipCode")}
          containerStyle={styles.container}
          isRequired
        />
        <TextInput
          title="Tel"
          placeholder="Enter your tel. no"
          value={inputValue.tel.value}
          onChangeText={handleOnChangeText.bind(this, "tel")}
          containerStyle={styles.container}
          isRequired
        />
      </View>
      <PrimaryButton title="Back" onPress={handleRequestParkingSpacePress} />
    </BodyContainer>
  );
};

export default RequestParkingLot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sameLineInputContainer: {
    gap: 10,
    flexDirection: "row",
  }
});
