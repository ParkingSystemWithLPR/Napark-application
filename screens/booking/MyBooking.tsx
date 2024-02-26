import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet, Pressable, SafeAreaView } from "react-native";

import ActiveTimeSlot from "../../components/booking/ActiveTimeSlot";
import CompletedTimeSlot from "../../components/booking/CompletedTimeSlot";
import SubHeaderText from "../../components/text/SubHeaderText";
import Colors from "../../constants/color";
import { RootParamList } from "../../types";

export type MyBookingProps = NativeStackScreenProps<RootParamList, "MyBooking">;

const MyBooking: React.FC<MyBookingProps> = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate("AllBookings");
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <SubHeaderText text="Active Session" textStyle={styles.activeSession} />
        <ActiveTimeSlot
          licensePlate="กบ 1454"
          space="space h3"
          timeRemaining="01hr:30min"
        />
        <View style={styles.completedSessionsWrapper}>
          <SubHeaderText
            text="Completed Sessions"
            textStyle={styles.completedSessionsText}
          />
          <Pressable onPress={onPress}>
            <SubHeaderText text="View all" textStyle={styles.viewAllText} />
          </Pressable>
        </View>
        <CompletedTimeSlot
          licensePlate="หส 4142"
          space="Spce f2"
          date="13/03/41"
          time="01:42 am"
          price="141"
        />
      </SafeAreaView>
    </View>
  );
};

export default MyBooking;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  activeSession: {
    paddingTop: 20,
    color: Colors.gray[900],
  },
  completedSessionsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  completedSessionsText: {
    color: Colors.gray[900],
  },
  viewAllText: {
    color: Colors.red[500],
    fontWeight: "bold",
  },
});
