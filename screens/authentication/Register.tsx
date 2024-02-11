import { StyleSheet, View, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import PrimaryButton from "../../components/button/PrimaryButton";
import BodyText from "../../components/text/BodyText";
import HeaderText from "../../components/text/HeaderText";
import TextInput from "../../components/input/TextInput";
import { RootStackParamList } from "../../types";

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
      <TextInput title="Email" placeholder="Your email" isRequired />
      <TextInput
        title="Password"
        placeholder="Your password"
        isRequired
        secureTextEntry
      />
      <TextInput
        title="Confirm Password"
        placeholder="Your password"
        isRequired
        secureTextEntry
      />
      <View style={styles.personalInfoContainer}>
        <TextInput
          title="Firstname"
          placeholder="Your firstname"
          isRequired
          containerStyle={styles.personalInfoInput}
        />
        <TextInput
          title="Lastname"
          placeholder="Your lastname"
          isRequired
          containerStyle={styles.personalInfoInput}
        />
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
