import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "@/constants/color";
import Bookings from "@/screens/bookings/Bookings";
import Account from "@/screens/account/Account";
import Landing from "@/screens/landing/Landing";
import Other from "@/screens/other/Other";
import Notification from "@/screens/Notification";
import {
  AuthenticatedStackParamList,
  MainPageBottomTabParamList,
} from "@/types";

const BottomTab = createBottomTabNavigator<MainPageBottomTabParamList>();

export type MainPageProps = NativeStackScreenProps<
  AuthenticatedStackParamList,
  "MainScreen"
>;

const MainPageBottomTab: React.FC<MainPageProps> = ({ navigation }) => {
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
        name="Bookings"
        component={Bookings}
        options={{
          headerShown: true,
          title: "Bookings",
          tabBarLabel: "Bookings",
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
        name="Notification"
        component={Notification}
        options={{
          headerShown: true,
          tabBarLabel: "Notification",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "bell-ring" : "bell-ring-outline"}
              size={size}
              color={color}
            />
          ),
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
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainPageBottomTab;
