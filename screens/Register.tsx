import { StyleSheet, Text, View, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import PrimaryButton from "../components/button/PrimaryButton";
import { RootStackParamList } from "../types";

export type RegisterProps = {} & NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

const Register: React.FC<RegisterProps> = () => {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.headerText}>Register</Text>
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
      <View style={styles.personalInfoContainer}>
        <View style={[styles.inputContainer, styles.personalInfoInput]}>
          <Text>Firstname</Text>
          <TextInput style={styles.input} placeholder="Your firstname" />
        </View>
        <View style={[styles.inputContainer, styles.personalInfoInput]}>
          <Text>Lastname</Text>
          <TextInput style={styles.input} placeholder="Your lastname" />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Confirm your password"
        />
      </View>
      <PrimaryButton title="Register" />
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
  headerText: {
    fontSize: 28,
    fontWeight: "500",
    color: "#F14951",
  },
  personalInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  inputContainer: {
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#7F7F7F",
    borderRadius: 8,
    padding: 5,
  },
  personalInfoInput: {
    flex: 1,
  },
});
