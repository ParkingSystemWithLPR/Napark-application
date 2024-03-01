import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet } from "react-native";

import PrimaryButton from "../../components/button/PrimaryButton";
import TextInput, { InputValueType } from "../../components/input/TextInput";
import HeaderText from "../../components/text/HeaderText";
import BodyContainer from "../../components/ui/BodyContainer";
import { RootParamList } from "../../types";

export type ChangePasswordProps = NativeStackScreenProps<
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

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = inputValue;

    const oldPasswordIsValid = oldPassword.value.length >= 8;
    const newPasswordIsValid = newPassword.value.length >= 8;
    const passwordsAreMatch = newPassword.value === confirmPassword.value;

    const isValid =
      oldPasswordIsValid && newPasswordIsValid && passwordsAreMatch;
    if (!isValid) {
      setInputValue((curInputValue: ChangePasswordInputType) => {
        return {
          oldPassword: {
            ...curInputValue.oldPassword,
            errorText: oldPasswordIsValid ? undefined : "Invalid password",
          },
          newPassword: {
            ...curInputValue.newPassword,
            errorText: newPasswordIsValid
              ? undefined
              : "Create a password with at least 8 characters",
          },
          confirmPassword: {
            ...curInputValue.confirmPassword,
            errorText: passwordsAreMatch ? undefined : "Password do not match",
          },
        };
      });
    } else {
      // TODO
    }
  };

  return (
    <BodyContainer innerContainerStyle={styles.loginContainer}>
      <HeaderText text="Change Password" />
      <TextInput
        title="Old Password"
        placeholder="Your old password"
        value={inputValue.oldPassword.value}
        onChangeText={handleOnChangeText.bind(this, "oldPassword")}
        isRequired
        errorText={inputValue.oldPassword.errorText}
        secureTextEntry
      />
      <TextInput
        title="New Password"
        placeholder="Your new password"
        value={inputValue.newPassword.value}
        onChangeText={handleOnChangeText.bind(this, "newPassword")}
        isRequired
        errorText={inputValue.newPassword.errorText}
        secureTextEntry
      />
      <TextInput
        title="Confirm Password"
        placeholder="Confirm your new password"
        value={inputValue.confirmPassword.value}
        onChangeText={handleOnChangeText.bind(this, "confirmPassword")}
        isRequired
        errorText={inputValue.confirmPassword.errorText}
        secureTextEntry
      />
      <PrimaryButton title="Change Password" onPress={handleChangePassword} />
    </BodyContainer>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    gap: 10,
  },
});
