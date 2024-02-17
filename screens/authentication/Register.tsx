import { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import PrimaryButton from "../../components/button/PrimaryButton";
import BodyText from "../../components/text/BodyText";
import HeaderText from "../../components/text/HeaderText";
import TextInput, { InputType } from "../../components/input/TextInput";
import { RootStackParamList } from "../../types";
import auth from "../../utils/auth";

export type RegisterProps = {} & NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

export type RegisterInputType = {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
};

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const [inputValue, setInputValue] = useState<RegisterInputType>({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
  });

  const handleOnChangeText = (identifierKey: string, enteredValue: string) => {
    setInputValue((curInputValue: RegisterInputType) => {
      return {
        ...curInputValue,
        [identifierKey]: enteredValue,
      };
    });
  };

  const handleLogInPress = () => {
    navigation.replace("LogIn");
  };

  const handleRegister = async () => {
    const { email, password, confirmPassword, firstname, lastname } =
      inputValue;

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 8;
    const passwordsAreMatch = password === confirmPassword;
    const firstnameIsValid = firstname.length > 0;
    const lastnameIsValid = lastname.length > 0;

    const isValid =
      emailIsValid &&
      passwordIsValid &&
      passwordsAreMatch &&
      firstnameIsValid &&
      lastnameIsValid;

    if (!isValid) {
    }
    const response = await auth.createUser(
      inputValue.email,
      inputValue.password
    );
  };

  return (
    <View style={styles.loginContainer}>
      <HeaderText text="Register" />
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
      <TextInput
        title="Confirm Password"
        placeholder="Your password"
        value={inputValue.confirmPassword}
        onChangeText={handleOnChangeText.bind(this, "confirmPassword")}
        isRequired
        secureTextEntry
      />
      <View style={styles.personalInfoContainer}>
        <TextInput
          title="Firstname"
          placeholder="Your firstname"
          value={inputValue.firstname}
          onChangeText={handleOnChangeText.bind(this, "firstname")}
          isRequired
          containerStyle={styles.personalInfoInput}
        />
        <TextInput
          title="Lastname"
          placeholder="Your lastname"
          value={inputValue.lastname}
          onChangeText={handleOnChangeText.bind(this, "lastname")}
          isRequired
          containerStyle={styles.personalInfoInput}
        />
      </View>
      <PrimaryButton title="Register" onPress={handleRegister} />
      <View style={styles.optionContainer}>
        <View>
          <Pressable onPress={handleLogInPress}>
            <BodyText text="Already have account?" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 40,
    paddingRight: 40,
    gap: 10,
  },
  personalInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  personalInfoInput: {
    flex: 1,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
