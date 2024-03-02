import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import OtherStack from "./OtherStack";

import Colors from "@/constants/color";
import Account from "@/screens/account/Account";
import MyBooking from "@/screens/booking/MyBooking";
import Landing from "@/screens/landing/Landing";
import Payment from "@/screens/payment/Payment";
import { RootParamList } from "@/types";

const BottomTab = createBottomTabNavigator<RootParamList>();

const MainPageBottomTab = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.red[400].toString(),
        tabBarInactiveTintColor: Colors.gray[800].toString(),
        headerTitleStyle: {
          fontSize: 18,
          color: Colors.white,
        },
        headerStyle: {
          backgroundColor: Colors.red[400],
          shadowOpacity: 0,
        },
        headerTitleAlign: "center",
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
          headerShown: true,
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
        }}
      />
      <BottomTab.Screen
        name="Others"
        component={OtherStack}
        options={{
          title: "Menu",
          tabBarLabel: "More",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainPageBottomTab;
