import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import TextInput, { InputValueType } from "@/components/input/TextInput";
import BodyContainer from "@/components/ui/BodyContainer";
import { useChangePassword } from "@/store/api/user/useChangePassword";
import { useAuth } from "@/store/context/auth";
import { useProfile } from "@/store/context/profile";
import { OtherStackParamList, AuthenticatedStackParamList } from "@/types";

export type ChangePasswordProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ChangePassword">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

export type ChangePasswordInputType = {
  oldPassword: InputValueType;
  newPassword: InputValueType;
  confirmPassword: InputValueType;
};

const ChangePassword: React.FC<ChangePasswordProps> = ({ navigation }) => {
  const { accessToken, authenticate } = useAuth();
  const { profile } = useProfile();
  const { mutateAsync: changePassword } = useChangePassword();
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
      try {
        await changePassword(
          {
            body: {
              email: profile.email,
              old_password: oldPassword.value,
              new_password: newPassword.value,
            },
            auth: {
              accessToken,
              authenticate,
            },
          },
          {
            onSuccess() {
              navigation.goBack();
            },
          }
        );
      } catch (error) {
        setInputValue((curInputValue: ChangePasswordInputType) => {
          return {
            ...curInputValue,
            oldPassword: {
              ...curInputValue.oldPassword,
              errorText: "Password is incorrect",
            },
          };
        });
      }
    }
  };

  return (
    <BodyContainer innerContainerStyle={styles.loginContainer}>
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
    paddingHorizontal: 30,
    gap: 10,
  },
});
