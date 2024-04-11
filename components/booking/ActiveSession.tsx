import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import DetailText from "../text/DetailText";
import SubHeaderText from "../text/SubHeaderText";

import Colors from "@/constants/color";
import { BookingStatus } from "@/enum/BookingStatus";


export interface activeSessionProps {
  bookingStatus: BookingStatus;
  licensePlate: string;
  space: string;
  timeRemaining: string;
  onPress: () => void;
}

const ActiveSession: React.FC<activeSessionProps> = ({
  licensePlate,
  space,
  timeRemaining,
  onPress,
  bookingStatus,
}) => {
  const [timeCountdown, setTimeCounting] = useState<number>();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeCounting((prev) => {
        return prev ? prev - 1 : new Date().getTime();
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getColor = useCallback(() => {
    switch (bookingStatus) {
      case BookingStatus.BOOKED:
        return Colors.red[600];
      case BookingStatus.PAID:
        return Colors.blue[500];
      default:
        return Colors.red[600];
    }
  }, []);
  const getIcon = useCallback(() => {
    switch (bookingStatus) {
      case BookingStatus.BOOKED:
        return "car-side";
      case BookingStatus.PAID:
        return "cash-fast";
      default:
        return "car-side";
    }
  }, []);

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <MaterialCommunityIcons
              name={getIcon()}
              size={20}
              color={getColor()}
            />
          </View>
          <View style={styles.informationContainer}>
            <View>
              <SubHeaderText text={"Samyan mitrtown"} />
              <DetailText
                text={space}
                textStyle={{ color: Colors.gray[800] }}
              />
              <View style={styles.subDetailContainer}>
                <DetailText
                  text={bookingStatus}
                  containerStyle={{
                    borderRightWidth: 1,
                    borderRightColor: getColor(),
                    paddingRight: 5,
                  }}
                  textStyle={{ color: getColor() }}
                />
                <DetailText
                  text={licensePlate}
                  textStyle={{ color: Colors.gray[800] }}
                />
              </View>
            </View>
            <View>
              <SubHeaderText text={`${timeCountdown} hr`} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ActiveSession;

const styles = StyleSheet.create({
  outerContainer: {
    borderBottomColor: Colors.gray[600],
    borderBottomWidth: 1,
  },
  container: {
    padding: 10,
    flexDirection: "row",
    gap: 5,
  },
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
    backgroundColor: Colors.gray[400],
    height: 32,
  },
  informationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  subDetailContainer: {
    flexDirection: "row",
    gap: 5,
  },
});
