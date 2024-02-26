import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootParamList } from "../types";
import Other from "../screens/other/Other";
import ParkingLotsList from "../screens/configuration-parking-lot/ParkingLotsList";
import ParkingLotDetail from "../screens/configuration-parking-lot/ParkingLotDetail";
import Colors from "../constants/color";

const Stack = createNativeStackNavigator<RootParamList>();

const OtherStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Others"
      screenOptions={{
        headerShown: true,
        title: "Menu",
        headerTitleStyle: {
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: Colors.red[400].toString(),
        },
        headerTintColor: Colors.white.toString(),
        headerTitleAlign: "left",
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Other" component={Other} />
      <Stack.Screen
        name="ParkingLotsList"
        component={ParkingLotsList}
        options={{
          headerTitle: "My parking space",
        }}
      />
      <Stack.Screen
        name="ParkingLotDetail"
        component={ParkingLotDetail}
        options={{
          headerTitle: "Parking space detail",
        }}
      />
    </Stack.Navigator>
  );
};

export default OtherStack;
