import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import {
  MainPageBottomTabParamList,
  AuthenticatedStackParamList,
} from "@/types";
import SecondaryButton from "@/components/button/SecondaryButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import BodyText from "@/components/text/BodyText";
import HeaderText from "@/components/text/HeaderText";
import SessionsList from "@/components/booking/SessionsList";
import { BookingType } from "@/enum/BookingType";
import { useCallback } from "react";

const Tab = createMaterialTopTabNavigator();

const mockBalance = 555.99;

const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const capitalizedActiveBookingType = capitalizeFirstLetter(BookingType.ACTIVE);
const capitalizedCompletedBookingType = capitalizeFirstLetter(
  BookingType.COMPLETED
);

export type BookingsProps = CompositeScreenProps<
  NativeStackScreenProps<MainPageBottomTabParamList, "Bookings">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const Bookings: React.FC<BookingsProps> = ({ navigation }) => {
  const renderActiveBookings = useCallback(() => {
    return <SessionsList type={BookingType.ACTIVE} />;
  }, []);

  const renderCompletedBookings = useCallback(() => {
    return <SessionsList type={BookingType.COMPLETED} />;
  }, []);

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
          name={capitalizedActiveBookingType}
          component={renderActiveBookings}
        />
        <Tab.Screen
          name={capitalizedCompletedBookingType}
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
