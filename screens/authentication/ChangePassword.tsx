import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import PrimaryButton from "../../components/button/PrimaryButton";
import HeaderText from "../../components/text/HeaderText";
import TextInput from "../../components/input/TextInput";
import { RootStackParamList } from "../../types";
import { useState } from "react";

export type ChangePasswordProps = {} & NativeStackScreenProps<
  RootStackParamList,
  "ChangePassword"
>;

export type ChangePasswordInputType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const [inputValue, setInputValue] = useState<ChangePasswordInputType>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleOnChangeText = (identifierKey: string, enteredValue: string) => {
    setInputValue((curInputValue: ChangePasswordInputType) => {
      return {
        ...curInputValue,
        [identifierKey]: enteredValue,
      };
    });
  };

  return (
    <View style={styles.loginContainer}>
      <HeaderText text="Reset Password" />
      <TextInput
        title="Old Password"
        placeholder="Your old password"
        value={inputValue.oldPassword}
        onChangeText={handleOnChangeText.bind(this, "oldPassword")}
        isRequired
        secureTextEntry
      />
      <TextInput
        title="New Password"
        placeholder="Your new password"
        value={inputValue.newPassword}
        onChangeText={handleOnChangeText.bind(this, "newPassword")}
        isRequired
        secureTextEntry
      />
      <TextInput
        title="Confirm Password"
        placeholder="Confirm your new password"
        value={inputValue.confirmPassword}
        onChangeText={handleOnChangeText.bind(this, "confirmPassword")}
        isRequired
        secureTextEntry
      />
      <PrimaryButton title="Change Password" />
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
