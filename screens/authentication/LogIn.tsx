import { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CheckboxInput from "../../components/input/CheckBoxInput";
import PrimaryButton from "../../components/button/PrimaryButton";
import HeaderText from "../../components/text/HeaderText";
import BodyText from "../../components/text/BodyText";
import TextInput from "../../components/input/TextInput";
import { RootStackParamList } from "../../types";

export type LogInProps = {} & NativeStackScreenProps<
  RootStackParamList,
  "LogIn"
>;

const LogIn: React.FC<LogInProps> = ({ navigation }) => {
  const [isRemember, setIsRemember] = useState<boolean>(false);

  const handleCheckboxPress = () => {
    setIsRemember((prev) => {
      return !prev;
    });
  };

  const handleCreateAccountPress = () => {
    navigation.navigate("Register");
  };

  const handleForgetPasswordPress = () => {
    navigation.navigate("ForgetPassword");
  };

  return (
    <View style={styles.loginContainer}>
      <HeaderText text="Log In" />
      <TextInput title="Email" placeholder="Your email" isRequired />
      <TextInput
        title="Password"
        placeholder="Your password"
        isRequired
        secureTextEntry
      />
      <CheckboxInput
        text="Remember me?"
        isChecked={isRemember}
        onPress={handleCheckboxPress}
      />
      <PrimaryButton title="Login" />
      <View style={styles.optionContainer}>
        <View>
          <Pressable onPress={handleCreateAccountPress}>
            <BodyText text="Create account" />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={handleForgetPasswordPress}>
            <BodyText text="Forget password?" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 15,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
