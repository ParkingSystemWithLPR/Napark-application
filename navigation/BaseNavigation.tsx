import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChangePassword from "../screens/authentication/ChangePassword";
import ResetPassword from "../screens/authentication/ResetPassword";
import SplashScreen from "../screens/SplashScreen";
<<<<<<< HEAD
import { useAuth } from "../store/context/auth";
import { RootParamList } from "../types";
import AuthStack from "./AuthStack";
import AuthenticatedStack from "./AuthenticatedStack";
=======

import { AuthContext } from "../store/context/auth";
import Payment from "../screens/payment/Payment";
import Account from "../screens/account/Account";
import Other from "../screens/other/Other";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../constants/color";
>>>>>>> 396b49f14a897d0e8ec89da04bae167a5d37aafe

import BookingSummary from "../screens/booking/BookingSummary";
import ConfirmBookingModal from "../screens/booking/ConfirmBookingModal";
import MyBooking from "../screens/booking/MyBooking";

import BookingSummary from "../screens/booking/BookingSummary";
import ConfirmBookingModal from "../screens/booking/ConfirmBookingModal";
import MyBooking from "../screens/booking/MyBooking";

export const Stack = createNativeStackNavigator<RootParamList>();
export const BottomTab = createBottomTabNavigator<RootParamList>();

<<<<<<< HEAD
=======
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LogIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
};
const BookingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName="MyBooking"
    >
      <Stack.Screen name="MyBooking" component={MyBooking} />
      <Stack.Screen name="BookingSummary" component={BookingSummary} />
      <Stack.Screen
        name="ConfirmBookingModal"
        component={ConfirmBookingModal}
        options={{
          presentation: "transparentModal",
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainScreen" component={MainPageScreen} />
    </Stack.Navigator>
  );
};

const MainPageScreen = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.red[400].toString(),
        tabBarInactiveTintColor: Colors.gray[900].toString(),
      }}
    >
      <BottomTab.Screen
        name="Landing"
        component={Landing}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "map-marker" : "map-marker-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Booking"
        component={BookingStack}
        options={{
          tabBarLabel: "My booking",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-cursor"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Payment"
        component={Payment}
        options={{
          tabBarLabel: "Payment",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "credit-card" : "credit-card-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: true,
          tabBarLabel: "Account",
          title: "My profile",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "account-circle" : "account-circle-outline"}
              size={size}
              color={color}
            />
          ),
          headerTitleStyle: {
            fontSize: 18,
          },
          headerStyle: {
            backgroundColor: Colors.red[400],
            shadowOpacity: 0,
          },
        }}
      />
      <BottomTab.Screen
        name="Other"
        component={Other}
        options={{
          headerShown: true,
          title: "Menu",
          tabBarLabel: "More",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={size}
              color={color}
            />
          ),
          headerTitleStyle: {
            fontSize: 18,
          },
          headerStyle: {
            backgroundColor: Colors.red[400],
            shadowOpacity: 0,
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

>>>>>>> 396b49f14a897d0e8ec89da04bae167a5d37aafe
const BaseNavigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        {isAuthenticated ? (
          <Stack.Screen name="Authenticated" component={AuthenticatedStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BaseNavigation;
