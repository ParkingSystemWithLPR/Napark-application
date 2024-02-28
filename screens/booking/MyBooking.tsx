import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet } from "react-native";

import MyBookingTab from "../../navigation/MyBookingTab";
import { RootParamList } from "../../types";

export type MyBookingProps = NativeStackScreenProps<RootParamList, "MyBooking">;

const MyBooking: React.FC<MyBookingProps> = () => {
  return (
    <View style={styles.container}>
      <MyBookingTab />
    </View>
  );
};

export default MyBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
