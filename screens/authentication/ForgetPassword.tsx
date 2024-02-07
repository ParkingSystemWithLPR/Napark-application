import { StyleSheet, View, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import PrimaryButton from "../../components/button/PrimaryButton";
import HeaderText from "../../components/text/HeaderText";
import BodyText from "../../components/text/BodyText";
import TextInput from "../../components/input/TextInput";
import { RootStackParamList } from "../../types";

export type ForgetPasswordProps = {} & NativeStackScreenProps<
  RootStackParamList,
  "ForgetPassword"
>;

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ navigation }) => {
  const handleLogInPress = () => {
    navigation.navigate("LogIn");
  };

  return (
    <View style={styles.loginContainer}>
      <HeaderText text="Forget Password" />
      <TextInput title="Email" placeholder="Your email" />
      <BodyText text="Please enter your email in the box above. We will send you a link to access further instructions." />
      <PrimaryButton title="Submit" />
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
