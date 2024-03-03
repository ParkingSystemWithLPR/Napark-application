import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View, Pressable, Alert } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import TextInput, { InputValueType } from "@/components/input/TextInput";
import BodyText from "@/components/text/BodyText";
import HeaderText from "@/components/text/HeaderText";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { InputType } from "@/enum/InputType";
import { useProfile } from "@/store/context/profile";
import { RootParamList } from "@/types";

export type RegisterProps = NativeStackScreenProps<RootParamList, "Register">;

export type RegisterInputType = {
  email: InputValueType;
  password: InputValueType;
  confirmPassword: InputValueType;
  firstname: InputValueType;
  lastname: InputValueType;
};

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const { createProfile } = useProfile();
  const [inputValue, setInputValue] = useState<RegisterInputType>({
    email: { value: "" },
    password: { value: "" },
    confirmPassword: { value: "" },
    firstname: { value: "" },
    lastname: { value: "" },
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleOnChangeText = (identifierKey: string, enteredValue: string) => {
    setInputValue((curInputValue: RegisterInputType) => {
      return {
        ...curInputValue,
        [identifierKey]: { value: enteredValue },
      };
    });
  };

  const handleLogInPress = () => {
    navigation.replace("LogIn");
  };

  const handleRegister = async () => {
    const { email, password, confirmPassword, firstname, lastname } =
      inputValue;

    const emailIsValid = email.value.includes("@");
    const passwordIsValid = password.value.length >= 8;
    const passwordsAreMatch = password.value === confirmPassword.value;
    const firstnameIsValid = firstname.value.length > 0;
    const lastnameIsValid = lastname.value.length > 0;

    const isValid =
      emailIsValid &&
      passwordIsValid &&
      passwordsAreMatch &&
      firstnameIsValid &&
      lastnameIsValid;

    if (!isValid) {
      setInputValue((curInputValue: RegisterInputType) => {
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
          confirmPassword: {
            ...curInputValue.confirmPassword,
            errorText: passwordsAreMatch ? undefined : "Password do not match",
          },
          firstname: {
            ...curInputValue.firstname,
            errorText: firstnameIsValid
              ? undefined
              : "Please enter your first name",
          },
          lastname: {
            ...curInputValue.lastname,
            errorText: lastnameIsValid
              ? undefined
              : "Please enter your last name",
          },
        };
      });
    } else {
      try {
        setLoading(true);
        await createProfile(
          {
            body: {
              email: email.value,
              password: password.value,
              firstname: firstname.value,
              lastname: lastname.value,
            },
          },
          (data) => {
            navigation.replace("LogIn", { defaultEmail: data.email });
          }
        );
      } catch (error) {
        setLoading(false);
        Alert.alert(
          "Registration Failed",
          "Please try again: " + (error as Error).message
        );
      }
    }
  };

  if (isLoading) return <LoadingOverlay />;

  return (
    <View style={styles.loginContainer}>
      <HeaderText text="Register" />
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
      <TextInput
        title="Confirm Password"
        placeholder="Your password"
        value={inputValue.confirmPassword.value}
        onChangeText={handleOnChangeText.bind(this, "confirmPassword")}
        errorText={inputValue.confirmPassword.errorText}
        isRequired
        secureTextEntry
      />
      <View style={styles.personalInfoContainer}>
        <TextInput
          title="Firstname"
          placeholder="Your firstname"
          value={inputValue.firstname.value}
          onChangeText={handleOnChangeText.bind(this, "firstname")}
          errorText={inputValue.firstname.errorText}
          isRequired
          containerStyle={styles.personalInfoInput}
        />
        <TextInput
          title="Lastname"
          placeholder="Your lastname"
          value={inputValue.lastname.value}
          onChangeText={handleOnChangeText.bind(this, "lastname")}
          errorText={inputValue.lastname.errorText}
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
