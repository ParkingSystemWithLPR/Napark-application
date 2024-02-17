import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import PrimaryButton from "../../components/button/PrimaryButton";
import HeaderText from "../../components/text/HeaderText";
import TextInput from "../../components/input/TextInput";
import { RootStackParamList } from "../../types";

export type ResetPasswordProps = {} & NativeStackScreenProps<
  RootStackParamList,
  "ResetPassword"
>;

export type ResetPasswordInputType = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [inputValue, setInputValue] = useState<ResetPasswordInputType>({
    newPassword: "",
    confirmPassword: "",
  });

  const handleOnChangeText = (identifierKey: string, enteredValue: string) => {
    setInputValue((curInputValue: ResetPasswordInputType) => {
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
      <PrimaryButton title="Reset Password" onPress={() => {}} />
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 15,
  },
});
