import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Badge } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import IconButton from "@/components/button/IconButton";
import Colors from "@/constants/color";
import Account from "@/screens/account/Account";
import MyBooking from "@/screens/booking/MyBooking";
import Landing from "@/screens/landing/Landing";
import Other from "@/screens/other/Other";
import Payment from "@/screens/payment/Payment";
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
        headerRight: () => {
          return (
            <View style={{ marginHorizontal: 10 }}>
              <IconButton
                icon={"bell-ring-outline"}
                size={24}
                color={Colors.white}
                buttonStyle={{ padding: 0, paddingHorizontal: 10 }}
                onPress={() => navigation.navigate("Notification")}
              />
              <Badge
                style={{
                  position: "absolute",
                  top: -3,
                  right: 5,
                  backgroundColor: Colors.blue[600],
                }}
              >
                3
              </Badge>
            </View>
          );
        },
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
          headerShown: true,
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
