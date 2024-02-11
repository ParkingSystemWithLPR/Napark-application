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

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  return (
    <View style={styles.loginContainer}>
      <HeaderText text="Reset Password" />
      <TextInput
        title="New Password"
        placeholder="Your new password"
        secureTextEntry={true}
      />
      <TextInput
        title="Confirm Password"
        placeholder="Confirm your new password"
        secureTextEntry={true}
      />
      <PrimaryButton title="Reset Password" />
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
