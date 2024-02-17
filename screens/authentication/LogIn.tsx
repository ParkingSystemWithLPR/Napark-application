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

export type LoginInputType = {
  email: string;
  password: string;
};

const LogIn: React.FC<LogInProps> = ({ navigation }) => {
  const [inputValue, setInputValue] = useState<LoginInputType>({
    email: "",
    password: "",
  });
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

  const handleOnChangeText = (identifierKey: string, enteredValue: string) => {
    setInputValue((curInputValue: LoginInputType) => {
      return {
        ...curInputValue,
        [identifierKey]: enteredValue,
      };
    });
  };

  return (
    <View style={styles.loginContainer}>
      <HeaderText text="Log In" />
      <TextInput
        title="Email"
        placeholder="Your email"
        value={inputValue.email}
        onChangeText={handleOnChangeText.bind(this, "email")}
        isRequired
      />
      <TextInput
        title="Password"
        placeholder="Your password"
        value={inputValue.password}
        onChangeText={handleOnChangeText.bind(this, "password")}
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
