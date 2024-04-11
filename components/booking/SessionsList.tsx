import { format } from "date-fns";
import { useCallback } from "react";
import {
  ColorValue,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BodyText from "../text/BodyText";
import DetailText from "../text/DetailText";
import SubHeaderText from "../text/SubHeaderText";

import Colors from "@/constants/color";
import { BookingStatus } from "@/enum/BookingStatus";
import { Booking } from "@/types/booking";
import {
  formatHumanReadableDateFromDateString,
  formatISODate,
} from "@/utils/date";

interface SessionCardProps {
  booking: Booking;
  onPress: () => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ booking, onPress }) => {
  const getColor = useCallback((status: BookingStatus): ColorValue => {
    switch (status) {
      case BookingStatus.UPCOMING:
        return Colors.black;
      case BookingStatus.UNPAID:
        return Colors.red[600];
      case BookingStatus.PAID:
        return Colors.blue[600];
      case BookingStatus.CANCELLED:
        return Colors.gray[800];
      case BookingStatus.COMPLETED:
        return Colors.green[800];
      default:
        return Colors.black;
    }
  }, []);

  const getIcon = useCallback((status: BookingStatus): string => {
    switch (status) {
      case BookingStatus.UPCOMING:
        return "car-clock";
      case BookingStatus.UNPAID:
        return "barcode-scan";
      case BookingStatus.PAID:
        return "cash-fast";
      case BookingStatus.CANCELLED:
        return "car-off";
      case BookingStatus.COMPLETED:
        return "car";
      default:
        return "car";
    }
  }, []);

  const renderSpecificInformation = useCallback(() => {
    switch (booking.status) {
      case BookingStatus.UPCOMING:
        return <BodyText text={""} />;
      case BookingStatus.UNPAID:
        return <BodyText text={""} />;
      case BookingStatus.PAID:
        return <BodyText text={""} />;
      case BookingStatus.CANCELLED:
        return <BodyText text={""} />;
      case BookingStatus.COMPLETED:
        return <BodyText text={""} />;
      default:
        return <BodyText text="Unknown" />;
    }
  }, []);

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <MaterialCommunityIcons
              name={getIcon(booking.status)}
              size={20}
              color={getColor(booking.status)}
            />
          </View>
          <View style={styles.informationContainer}>
            <View>
              <SubHeaderText
                text={`${booking.parkinglot_name} - ${booking.slot_name}`}
              />
              <BodyText
                text={booking.license_plate}
                textStyle={{ color: Colors.gray[800] }}
              />
              <View style={styles.subDetailContainer}>
                <DetailText
                  text={
                    booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)
                  }
                  containerStyle={{
                    borderRightWidth: 1,
                    borderRightColor: getColor(booking.status),
                    paddingRight: 5,
                  }}
                  textStyle={{ color: getColor(booking.status) }}
                />
                <DetailText
                  text={format(booking.start_time, "PP pp")}
                  textStyle={{ color: Colors.gray[800] }}
                />
              </View>
            </View>
            <View>{renderSpecificInformation()}</View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

interface sessionsProps {
  bookings: Booking[];
}

const SessionsList: React.FC<sessionsProps> = ({ bookings }) => {
  return bookings.length > 0 ? (
    <FlatList
      data={bookings}
      keyExtractor={(item: Booking) => item._id}
      renderItem={({ item }) => {
        return <SessionCard booking={item} onPress={() => {}} />;
      }}
      overScrollMode="never"
    />
  ) : (
    <BodyText text="No bookings" />
  );
};

export default SessionsList;

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
