import { useState } from "react";
import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import PrimaryButton from "../components/button/PrimaryButton";
import Checkbox from "../components/checkbox";
import HeaderText from "../components/text/HeaderText";
import { RootStackParamList } from "../types";
import SubHeaderText from "../components/text/SubHeaderText";
import BodyText from "../components/text/BodyText";

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
      <View style={styles.inputContainer}>
        <SubHeaderText text="Email" />
        <TextInput style={styles.input} placeholder="Your email" />
      </View>
      <View style={styles.inputContainer}>
        <SubHeaderText text="Password" />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Your password"
        />
      </View>
      <Checkbox
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
  inputContainer: {
    gap: 5,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "#7F7F7F",
    borderRadius: 8,
    padding: 5,
  },
});
