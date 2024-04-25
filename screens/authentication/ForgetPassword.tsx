import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import { useState } from "react";
import { StyleSheet, View, Pressable, Alert } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import TextInput, { InputValueType } from "@/components/input/TextInput";
import BodyText from "@/components/text/BodyText";
import HeaderText from "@/components/text/HeaderText";
import { InputType } from "@/enum/InputType";
import { USER_URL } from "@/store/api/user";
import { AuthStackParamList } from "@/types";

export type ForgetPasswordProps = NativeStackScreenProps<
  AuthStackParamList,
  "ForgetPassword"
>;

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ navigation }) => {
  const [email, setEmail] = useState<InputValueType>({ value: "" });
  const handleLogInPress = () => {
    navigation.replace("LogIn");
  };

  const onSubmit = async () => {
    const emailIsValid = email.value.includes("@");

    const isValid = emailIsValid;
    if (!isValid) {
      setEmail((cur: InputValueType) => {
        return {
          ...cur,
          errorText: emailIsValid ? undefined : "Invalid email address",
        };
      });
    } else {
      try {
        const res = await axios.post(USER_URL + "/user/forget-password", {
          email,
        });
        Alert.alert("Please check your email", `Ref No: ${res.data.ref_no}`);
      } catch (error: any) {}
    }
  };

  return (
    <View style={styles.loginContainer}>
      <HeaderText text="Forget Password" />
      <TextInput
        title="Email"
        placeholder="Your email"
        value={email.value}
        onChangeText={(value) => setEmail({ value })}
        inputMode={InputType.Email}
        errorText={email.errorText}
        isRequired
      />
      <BodyText text="Please enter your email in the box above. We will send you a link to access further instructions." />
      <PrimaryButton title="Submit" onPress={onSubmit} />
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
