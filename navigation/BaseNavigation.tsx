import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RootParamList } from "../types";

import ChangePassword from "../screens/authentication/ChangePassword";
import ResetPassword from "../screens/authentication/ResetPassword";
import ForgetPassword from "../screens/authentication/ForgetPassword";
import LogIn from "../screens/authentication/LogIn";
import Register from "../screens/authentication/Register";
import Landing from "../screens/landing/Landing";
import SplashScreen from "../screens/SplashScreen";

import { AuthContext } from "../store/context/auth";
import MyBooking from "../screens/booking/MyBooking";
import Payment from "../screens/payment/Payment";
import Account from "../screens/account/Account";
import Other from "../screens/other/Other";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../constants/color";

export const Stack = createNativeStackNavigator<RootParamList>();
export const BottomTab = createBottomTabNavigator<RootParamList>();

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
        name="MyBooking"
        component={MyBooking}
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

const BaseNavigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        {authCtx.isAuthenticated ? (
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
