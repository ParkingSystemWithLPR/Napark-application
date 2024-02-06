import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import PrimaryButton from "../components/button/PrimaryButton";
import { RootStackParamList } from "../types";

export type LogInProps = {} & NativeStackScreenProps<
  RootStackParamList,
  "LogIn"
>;

const LogIn: React.FC<LogInProps> = () => {
  const [isRemember, setIsRemember] = useState<boolean>(false);

  const handleCheckboxPress = () => {
    setIsRemember((prev) => {
      return !prev;
    });
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.headerText}>Log In</Text>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput style={styles.input} placeholder="Your email" />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Your password"
        />
      </View>
      <PrimaryButton title="Login" />
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 40,
    paddingRight: 40,
    gap: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "500",
    color: "#F14951",
  },
  inputContainer: {
    gap: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkbox: {
    width: 32,
    height: 32,
  },
  optionContainer: {
    flex: 1,
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
