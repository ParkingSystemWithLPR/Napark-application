import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import PrimaryButton from "../../components/button/PrimaryButton";
import HeaderText from "../../components/text/HeaderText";
import TextInput, { InputValueType } from "../../components/input/TextInput";
import { RootParamList } from "../../types";
import { useState } from "react";

export type ChangePasswordProps = {} & NativeStackScreenProps<
  RootParamList,
  "ChangePassword"
>;

export type ChangePasswordInputType = {
  oldPassword: InputValueType;
  newPassword: InputValueType;
  confirmPassword: InputValueType;
};

const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const [inputValue, setInputValue] = useState<ChangePasswordInputType>({
    oldPassword: { value: "" },
    newPassword: { value: "" },
    confirmPassword: { value: "" },
  });

  const handleOnChangeText = (identifierKey: string, enteredValue: string) => {
    setInputValue((curInputValue: ChangePasswordInputType) => {
      return {
        ...curInputValue,
        [identifierKey]: { value: enteredValue },
      };
    });
  };

  return (
    <View style={styles.loginContainer}>
      <HeaderText text="Reset Password" />
      <TextInput
        title="Old Password"
        placeholder="Your old password"
        value={inputValue.oldPassword.value}
        onChangeText={handleOnChangeText.bind(this, "oldPassword")}
        isRequired
        secureTextEntry
      />
      <TextInput
        title="New Password"
        placeholder="Your new password"
        value={inputValue.newPassword.value}
        onChangeText={handleOnChangeText.bind(this, "newPassword")}
        isRequired
        secureTextEntry
      />
      <TextInput
        title="Confirm Password"
        placeholder="Confirm your new password"
        value={inputValue.confirmPassword.value}
        onChangeText={handleOnChangeText.bind(this, "confirmPassword")}
        isRequired
        secureTextEntry
      />
      <PrimaryButton title="Change Password" onPress={() => {}} />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 15,
  },
});
