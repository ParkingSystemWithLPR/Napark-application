import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import SessionsList from "@/components/booking/SessionsList";
import SecondaryButton from "@/components/button/SecondaryButton";
import BodyText from "@/components/text/BodyText";
import HeaderText from "@/components/text/HeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { BookingStatus } from "@/enum/BookingStatus";
import { BookingType } from "@/enum/BookingType";
import { mockedBooking } from "@/mock/mockData";
import { useGetMyBookings } from "@/store/api/booking/useGetMyBookings";
import { useAuth } from "@/store/context/auth";
import {
  MainPageBottomTabParamList,
  AuthenticatedStackParamList,
} from "@/types";
import { Booking } from "@/types/booking";

const Tab = createMaterialTopTabNavigator();

const mockBalance = 555.99;

export type BookingsProps = CompositeScreenProps<
  NativeStackScreenProps<MainPageBottomTabParamList, "Bookings">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const Bookings: React.FC<BookingsProps> = ({ navigation }) => {
  const { accessToken, authenticate } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const getMyBookings = useGetMyBookings({
    auth: { accessToken, authenticate },
  });

  useLayoutEffect(() => {
    if (getMyBookings.isSuccess) {
      setBookings(getMyBookings.data);
    }
    setBookings(mockedBooking);
  }, [getMyBookings.data]);

  const renderUpcomingBookings = useCallback(() => {
    const upcomingBookings = bookings.filter(
      (booking) => booking.status === BookingStatus.UPCOMING
    );
    return <SessionsList bookings={upcomingBookings} />;
  }, [bookings]);

  const renderActiveBookings = useCallback(() => {
    const activeBookings = bookings.filter(
      (booking) =>
        booking.status === BookingStatus.PAID ||
        booking.status === BookingStatus.UNPAID
    );
    return <SessionsList bookings={activeBookings} />;
  }, [bookings]);

  const renderCompletedBookings = useCallback(() => {
    const completedBookings = bookings.filter(
      (booking) =>
        booking.status === BookingStatus.COMPLETED ||
        booking.status === BookingStatus.CANCELLED
    );
    return <SessionsList bookings={completedBookings} />;
  }, [bookings]);

  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <View style={styles.wallet}>
        <View style={styles.walletRow}>
          <View style={styles.myWallet}>
            <Ionicons name="wallet-outline" size={20} color={Colors.white} />
            <BodyText text={"My Wallet"} textStyle={{ color: Colors.white }} />
          </View>
        </View>
        <View style={styles.walletRow}>
          <HeaderText
            text={`฿ ${mockBalance}`}
            textStyle={{ color: Colors.black, fontSize: 18 }}
          />
          <SecondaryButton
            onPress={() => {
              navigation.navigate("BookingsStack", {
                screen: "TopUp",
                params: { balance: mockBalance },
              });
            }}
            buttonStyle={styles.topUpButton}
            textStyle={styles.topUpButtonText}
            title="+ Top Up"
          />
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: Colors.red[400].toString() },
        }}
        sceneContainerStyle={styles.tabContent}
      >
        <Tab.Screen
          name={BookingType.UPCOMING}
          component={renderUpcomingBookings}
        />
        <Tab.Screen
          name={BookingType.ACTIVE}
          component={renderActiveBookings}
        />
        <Tab.Screen
          name={BookingType.COMPLETED}
          component={renderCompletedBookings}
        />
      </Tab.Navigator>
    </BodyContainer>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingHorizontal: 0,
  },
  wallet: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 20,
    marginHorizontal: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    borderRadius: 16,
    backgroundColor: Colors.white,
  },
  walletRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  myWallet: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    gap: 5,
    borderRadius: 8,
    backgroundColor: Colors.red[600],
  },
  topUpButton: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.red[600],
  },
  topUpButtonText: {
    color: Colors.red[600],
  },
  tabContent: {
    flex: 1,
    marginTop: 5,
    backgroundColor: Colors.gray[50],
  },
});
