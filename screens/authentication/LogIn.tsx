import { useState } from "react";
import { StyleSheet, View, Pressable, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CheckboxInput from "../../components/input/CheckBoxInput";
import PrimaryButton from "../../components/button/PrimaryButton";
import HeaderText from "../../components/text/HeaderText";
import BodyText from "../../components/text/BodyText";
import TextInput, {
  InputType,
  InputValueType,
} from "../../components/input/TextInput";
import { RootParamList } from "../../types";

import { useAuth } from "../../store/context/auth";

export type LogInProps = {} & NativeStackScreenProps<RootParamList, "LogIn">;

export type LoginInputType = {
  email: InputValueType;
  password: InputValueType;
};

const LogIn: React.FC<LogInProps> = ({ navigation }) => {
  const { login } = useAuth();
  const [inputValue, setInputValue] = useState<LoginInputType>({
    email: { value: "" },
    password: { value: "" },
  });

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
        [identifierKey]: { value: enteredValue },
      };
    });
  };

  const handleLogin = async () => {
    const { email, password } = inputValue;

    const emailIsValid = email.value.includes("@");
    const passwordIsValid = password.value.length >= 8;

    const isValid = emailIsValid && passwordIsValid;
    if (!isValid) {
      setInputValue((curInputValue: LoginInputType) => {
        return {
          email: {
            ...curInputValue.email,
            errorText: emailIsValid ? undefined : "Invalid email address",
          },
          password: {
            ...curInputValue.password,
            errorText: passwordIsValid
              ? undefined
              : "Create a password with at least 8 characters",
          },
        };
      });
    } else {
      try {
        await login(email.value, password.value);
        navigation.replace("Authenticated");
      } catch (error) {
        Alert.alert(
          "Authentication Failed",
          "Please try logging in again!!: " + (error as Error).message
        );
      }
    }
  };

  return (
    <View style={styles.loginContainer}>
      <HeaderText text="Log In" />
      <TextInput
        title="Email"
        placeholder="Your email"
        value={inputValue.email.value}
        onChangeText={handleOnChangeText.bind(this, "email")}
        inputMode={InputType.Email}
        errorText={inputValue.email.errorText}
        isRequired
      />
      <TextInput
        title="Password"
        placeholder="Your password"
        value={inputValue.password.value}
        onChangeText={handleOnChangeText.bind(this, "password")}
        errorText={inputValue.password.errorText}
        isRequired
        secureTextEntry
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
