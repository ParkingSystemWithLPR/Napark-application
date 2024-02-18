import { useState } from "react";
import { StyleSheet, View, Pressable, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CheckboxInput from "../../components/input/CheckBoxInput";
import PrimaryButton from "../../components/button/PrimaryButton";
import HeaderText from "../../components/text/HeaderText";
import BodyText from "../../components/text/BodyText";
import TextInput, { InputType } from "../../components/input/TextInput";
import { RootStackParamList } from "../../types";

import auth from "../../utils/user";

import { useAuth } from "../../store/context/auth";

export type LogInProps = {} & NativeStackScreenProps<
  RootStackParamList,
  "LogIn"
>;

export type LoginInputType = {
  email: string;
  password: string;
};

const LogIn: React.FC<LogInProps> = ({ navigation }) => {
  const { login } = useAuth();
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
    navigation.replace("Register");
  };

  const handleForgetPasswordPress = () => {
    navigation.replace("ForgetPassword");
  };

  const handleOnChangeText = (identifierKey: string, enteredValue: string) => {
    setInputValue((curInputValue: LoginInputType) => {
      return {
        ...curInputValue,
        [identifierKey]: enteredValue,
      };
    });
  };

  const handleLogin = async () => {
    const { email, password } = inputValue;

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 8;

    const isValid = emailIsValid && passwordIsValid;
    if (!isValid) {
      return;
    }
    try {
      await login(inputValue.email, inputValue.password);
      navigation.replace("Authenticated");
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Please try logging in again!!: " + (error as Error).message
      );
    }
  };

  return (
    <View style={styles.loginContainer}>
      <HeaderText text="Log In" />
      <TextInput
        title="Email"
        placeholder="Your email"
        value={inputValue.email}
        onChangeText={handleOnChangeText.bind(this, "email")}
        inputMode={InputType.Email}
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
      <PrimaryButton title="Login" onPress={handleLogin} />
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
