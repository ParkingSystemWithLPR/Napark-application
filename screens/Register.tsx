import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import PrimaryButton from "../components/button/PrimaryButton";
import { RootStackParamList } from "../types";
import BodyText from "../components/text/BodyText";
import SubHeaderText from "../components/text/SubHeaderText";
import HeaderText from "../components/text/HeaderText";

export type RegisterProps = {} & NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const handleLogInPress = () => {
    navigation.navigate("LogIn");
  };

  return (
    <View style={styles.loginContainer}>
      <HeaderText text="Register" />
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
      <View style={styles.inputContainer}>
        <SubHeaderText text="Confirm Password" />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Confirm your password"
        />
      </View>
      <View style={styles.personalInfoContainer}>
        <View style={[styles.inputContainer, styles.personalInfoInput]}>
          <SubHeaderText text="Firstname" />
          <TextInput style={styles.input} placeholder="Your firstname" />
        </View>
        <View style={[styles.inputContainer, styles.personalInfoInput]}>
          <SubHeaderText text="Lastname" />
          <TextInput style={styles.input} placeholder="Your lastname" />
        </View>
      </View>
      <PrimaryButton title="Register" />
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
  optionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
