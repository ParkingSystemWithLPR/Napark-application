import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import PrimaryButton from "../../components/button/PrimaryButton";
import HeaderText from "../../components/text/HeaderText";
import TextInput from "../../components/input/TextInput";
import { RootStackParamList } from "../../types";
import { useAuth } from "../../store/context/auth";

export type LandingProps = {} & NativeStackScreenProps<
  RootStackParamList,
  "Landing"
>;

const Landing: React.FC<LandingProps> = () => {
  const { logout } = useAuth();

  return (
    <View style={styles.loginContainer}>
      <HeaderText text="Welcome to landing page!!" />
      <Button title="logout" onPress={logout} />
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 15,
  },
});
