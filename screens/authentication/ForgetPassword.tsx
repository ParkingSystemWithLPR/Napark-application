import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";

import PrimaryButton from "../../components/button/PrimaryButton";
import TextInput, { InputType } from "../../components/input/TextInput";
import BodyText from "../../components/text/BodyText";
import HeaderText from "../../components/text/HeaderText";
import { RootParamList } from "../../types";

export type ForgetPasswordProps = NativeStackScreenProps<
  RootParamList,
  "ForgetPassword"
>;

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const handleLogInPress = () => {
    navigation.replace("LogIn");
  };

  return (
    <View style={styles.loginContainer}>
      <HeaderText text="Forget Password" />
      <TextInput
        title="Email"
        placeholder="Your email"
        value={email}
        onChangeText={setEmail}
        inputMode={InputType.Email}
        isRequired
      />
      <BodyText text="Please enter your email in the box above. We will send you a link to access further instructions." />
      <PrimaryButton title="Submit" onPress={() => {}} />
      <View style={styles.optionContainer}>
        <View>
          <Pressable onPress={handleLogInPress}>
            <BodyText text="Back to log in" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 15,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
